import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useActionSelectAllItems } from './useActionSelectAllItems';

describe('useActionSelectAllItems', () => {
  let emit: any;
  let props: any;

  beforeEach(() => {
    emit = vi.fn();
    props = {
      checkboxSelectAllValue: false,
    };
  });

  test('Dado os valores padrões Quando inicializado Então a ação em massa e o checkbox deve ter os estados de `false`', () => {
    const { showBulkActions, checkboxAllSelected, checkboxAllSelectedIndeterminate } = useActionSelectAllItems(
      emit,
      props
    );

    expect(showBulkActions.value).toBe(false);
    expect(checkboxAllSelected.value).toBe(false);
    expect(checkboxAllSelectedIndeterminate.value).toBe(false);
  });

  test('Dado a visualização do checkbox geral Quando setado como `null` Então o checkbox deve estar indeterminado e deve exibir as ações em massa', () => {
    const { setValueSelectedItemsCheckbox, checkboxAllSelected, checkboxAllSelectedIndeterminate, showBulkActions } =
      useActionSelectAllItems(emit, props);

    setValueSelectedItemsCheckbox(null);

    expect(checkboxAllSelectedIndeterminate.value).toBe(true);
    expect(checkboxAllSelected.value).toBe(false);
    expect(showBulkActions.value).toBe(true);
  });

  test('Dado  a visualização do checkbox geral Quando atualizado com valor `true` Então deve atualizar os valores do checkbox de forma a setar o ideterminado como false e emitir a ação de que tudo está selecionado', () => {
    const {
      updateCheckboxAllSelected,
      checkboxAllSelected,
      checkboxAllSelectedIndeterminate,
      currentValueCheckboxSelectAll,
    } = useActionSelectAllItems(emit, props);

    updateCheckboxAllSelected(true);

    expect(checkboxAllSelectedIndeterminate.value).toBe(false);
    expect(checkboxAllSelected.value).toBe(true);
    expect(currentValueCheckboxSelectAll.value).toBe(true);
    expect(emit).toHaveBeenCalledWith('select-all', true);
  });
});
