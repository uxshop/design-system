import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { IndexTableListProps, NameItemTableSelected } from '../types';
import { useIndexTableList } from './useIndexTableList';

describe('useIndexTableList', () => {
  let emit: any;
  let props: IndexTableListProps<any>;

  beforeEach(() => {
    emit = vi.fn();
    props = {
      fields: [{ key: 'name', label: 'Name' }],
      items: [{ name: 'Item 1' }, { name: 'Item 2' }],
      checkboxSelectAllValue: false,
      emptyResultDisplay: {
        show: false,
      },
      ordination: [
        {
          key: 'name|asc',
          label: 'Name (A-z)',
          active: true,
        },
        {
          key: 'name|desc',
          label: 'Name (Z-a)',
          active: false,
        },
      ],
    };
  });

  test('Dado os valores padrões Quando inicializado Então nenhum item deve estar selecionado', () => {
    const { selectedItems } = useIndexTableList(props, emit);

    expect(selectedItems.value).toEqual([]);
  });

  test('Dado um item selecionado Quando atualizado pelo teclado Então o item deve ser adicionado à lista de selecionados', () => {
    const { selectedItems, updateItemSelectedWithKeyboard } = useIndexTableList(props, emit);

    updateItemSelectedWithKeyboard('item-0' as NameItemTableSelected);

    expect(selectedItems.value).toContain('item-0');
  });

  test('Dado um item selecionado Quando atualizado novamente pelo teclado Então o item deve ser removido da lista de selecionados', () => {
    const { selectedItems, updateItemSelectedWithKeyboard } = useIndexTableList(props, emit);

    updateItemSelectedWithKeyboard('item-0' as NameItemTableSelected);
    updateItemSelectedWithKeyboard('item-0' as NameItemTableSelected);

    expect(selectedItems.value).not.toContain('item-0');
  });

  test('Dado a seleção de todos os itens Quando o checkbox geral é atualizado para true Então todos os itens devem ser selecionados', () => {
    const { selectedItems, selectAllItems } = useIndexTableList(props, emit);

    selectAllItems(true);

    expect(selectedItems.value).toEqual(['item-0', 'item-1']);
  });

  test('Dado a seleção de todos os itens Quando o checkbox geral é atualizado para false Então nenhum item deve ser selecionado', () => {
    const { selectedItems, selectAllItems } = useIndexTableList(props, emit);

    selectAllItems(true);
    selectAllItems(false);

    expect(selectedItems.value).toEqual([]);
  });

  test('Dado um item selecionado Quando a função selectItem é chamada Então deve emitir os eventos corretos que indique que alguns itens foram selecionados e quais os itens selecionados', () => {
    const { selectItem } = useIndexTableList(props, emit);

    selectItem(['item-0']);

    expect(emit).toHaveBeenCalledWith('selected-all-items', null);
    expect(emit).toHaveBeenCalledWith('selected-items', [{ name: 'Item 1' }]);
  });

  test('Dado todos os itens selecionados Quando a função selectItem é chamada com todos os itens Então deve emitir que todos os itens estão selecionados e quais os itens estão selecionados', () => {
    const { selectItem } = useIndexTableList(props, emit);

    selectItem(['item-0', 'item-1']);

    expect(emit).toHaveBeenCalledWith('selected-all-items', true);
    expect(emit).toHaveBeenCalledWith('selected-items', [{ name: 'Item 1' }, { name: 'Item 2' }]);
  });

  describe('isOrdinationActive', () => {
    test('Dado uma ordenação ativa Quando verificar se está ativa para o campo correto Então deve retornar true', () => {
      const { isOrdinationActive } = useIndexTableList(props, emit);

      const result = isOrdinationActive.value('name', 'asc');

      expect(result).toBe(true);
    });

    test('Dado uma ordenação ativa Quando verificar se está ativa para um campo diferente Então deve retornar false', () => {
      const { isOrdinationActive } = useIndexTableList(props, emit);

      const result = isOrdinationActive.value('other_field', 'asc');

      expect(result).toBe(false);
    });

    test('Dado uma ordenação ativa ascendente Quando verificar se está ativa como descendente Então deve retornar false', () => {
      const { isOrdinationActive } = useIndexTableList(props, emit);

      const result = isOrdinationActive.value('name', 'desc');

      expect(result).toBe(false);
    });

    test('Dado nenhuma ordenação ativa Quando verificar qualquer campo Então deve retornar false', () => {
      props.ordination = [];
      const { isOrdinationActive } = useIndexTableList(props, emit);

      const result = isOrdinationActive.value('name', 'asc');

      expect(result).toBe(false);
    });
  });
});
