import { computed, ref } from 'vue';
import type { IndexTableListEmits, IndexTableListProps, NameItemTableSelected } from '../types';

export function useIndexTableList<T>(props: IndexTableListProps<T>, emit: IndexTableListEmits<T>) {
  const selectedItems = ref<NameItemTableSelected[]>([]);

  const prepareKeysToCell = computed(() => (items: object) => {
    const itemsOfList = Object.entries(items).map((item: string[]) => {
      return {
        key: item[0],
        value: item[1],
      };
    });

    return props.fields.map((field) => ({
      key: field.key,
      value: itemsOfList.find((item) => item.key === field.key)?.value,
    }));
  });

  /**
   * O objeto dos itens selecionados retornados em uma lista
   */
  const itemsSelectedObject = computed(() => {
    const allIndexes = selectedItems.value.map((item) => {
      return parseInt(item.split('-')[1]);
    });

    return allIndexes.map((index) => {
      return props.items[index];
    });
  });

  /**
   * Atualiza o item selecionado quando a ação é feita pelo teclado
   */
  const updateItemSelectedWithKeyboard = (item: NameItemTableSelected) => {
    const listSelectedItems = [...selectedItems.value];

    if (listSelectedItems.includes(item)) {
      listSelectedItems.splice(listSelectedItems.indexOf(item), 1);
    } else {
      listSelectedItems.push(item);
    }

    selectItem(listSelectedItems);
  };

  /**
   * Seleciona um item da lista
   */
  const selectItem = (value: NameItemTableSelected[]) => {
    const anyItem = value.length >= 1 && value.length < props.items.length;
    emit('selected-all-items', anyItem ? null : props.items.length === value.length);

    selectedItems.value = value;
    emit('selected-items', itemsSelectedObject.value);
  };

  /**
   * Seleciona todos os itens da lista
   */
  const selectAllItems = (valueOfCheckbox: boolean | null) => {
    if (valueOfCheckbox === null) return;

    const currentSelectedItems = props.items.map((item, index: number) => `item-${index}` as NameItemTableSelected);

    selectedItems.value = valueOfCheckbox ? currentSelectedItems : [];
  };

  /**
   * Formata o nome da chave para o formato de classe
   */
  const formatKeyToClass = (key: string) => {
    return key.replace(/_/g, '-');
  };

  return {
    selectedItems,
    prepareKeysToCell,
    itemsSelectedObject,
    updateItemSelectedWithKeyboard,
    selectItem,
    selectAllItems,
    formatKeyToClass,
  };
}
