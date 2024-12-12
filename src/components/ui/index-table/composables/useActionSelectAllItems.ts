import type { IndexTableActionsEmits, IndexTableActionsProps } from '../types';
import { computed, onMounted, ref, watch } from 'vue';

export const useActionSelectAllItems = (emit: IndexTableActionsEmits, props: IndexTableActionsProps) => {
  const showBulkActions = ref(false);
  const checkboxAllSelected = ref(false);
  const checkboxAllSelectedIndeterminate = ref(false);

  /** Valor computado do checkbox que exibe se está indeterminate ou se está selecionado */
  const currentValueCheckboxSelectAll = computed(() => {
    if (checkboxAllSelectedIndeterminate.value === true) return null;

    return checkboxAllSelected.value;
  });

  /**
   * Usado para alterar o valor do checkbox de seleção de todos os itens baseado no valor
   * da prop
   */
  const setValueSelectedItemsCheckbox = (value: boolean | null) => {
    if (value === null) {
      checkboxAllSelectedIndeterminate.value = true;
      checkboxAllSelected.value = false;

      showBulkActions.value = true;
      return;
    }

    checkboxAllSelectedIndeterminate.value = false;
    checkboxAllSelected.value = value;
    showBulkActions.value = value;
  };

  /**
   * Atualiza o valor do checkbox de seleção de todos os itens e emite o evento com o valor do mesmo
   */
  const updateCheckboxAllSelected = (value: boolean | null) => {
    setValueSelectedItemsCheckbox(value);

    emit('select-all', currentValueCheckboxSelectAll.value);
  };

  onMounted(() => setValueSelectedItemsCheckbox(props.checkboxSelectAllValue as boolean | null));

  watch(
    () => props.checkboxSelectAllValue,
    (newValue) => {
      if (newValue === currentValueCheckboxSelectAll.value) return;

      updateCheckboxAllSelected(newValue as boolean | null);
    }
  );

  return {
    showBulkActions,
    checkboxAllSelected,
    checkboxAllSelectedIndeterminate,
    currentValueCheckboxSelectAll,
    setValueSelectedItemsCheckbox,
    updateCheckboxAllSelected,
  };
};
