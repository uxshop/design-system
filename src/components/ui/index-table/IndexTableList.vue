<script setup lang="ts" generic="T extends object">
import Table from '#ds/components/admin/table/Table.vue';
import TableBody from '#ds/components/admin/table/TableBody.vue';
import TableCell from '#ds/components/admin/table/TableCell.vue';
import TableHeadCell from '#ds/components/admin/table/TableHeadCell.vue';
import TableRow from '#ds/components/admin/table/TableRow.vue';
import FormCheckbox from '#ds/components/ui/form-checkbox/FormCheckbox.vue';
import { computed, ref, watch } from 'vue';
import IndexTableEmptyMessage from './IndexTableEmptyMessage.vue';
import type { IndexTableListEmits, IndexTableListProps, IndexTableListSlots, NameItemTableSelected } from './types';

const props = withDefaults(defineProps<IndexTableListProps<T>>(), {
  show: () => ({
    select: true,
  }),
  checkboxSelectAllValue: false,
  showNotFoundMessageForFilter: false,
});
const emit = defineEmits<IndexTableListEmits<T>>();
const slots = defineSlots<IndexTableListSlots<T>>();

const selectedItems = ref<NameItemTableSelected[]>([]);

/**
 * Prepara os dados de item a serem exibidos na tabela, de acordo com a prop
 * `fields` que define os campos a serem exibidos.
 */
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
 * Retorna os itens selecionados na tabela.
 */
const itemsSelectedObject = computed(() => {
  const allIndexes = selectedItems.value.map((item) => {
    return parseInt(item.split('-')[1]);
  });

  return allIndexes.map((index) => {
    return props.items[index];
  });
});

const selectItem = (value: NameItemTableSelected[]) => {
  const anyItem = value.length >= 1 && value.length < props.items.length;
  emit('selected-all-items', anyItem ? null : props.items.length === value.length);

  selectedItems.value = value;
  emit('selected-items', itemsSelectedObject.value);
};

const selectAllItems = (valueOfCheckbox: boolean | null) => {
  if (valueOfCheckbox === null) return;

  const currentSelectedItems = props.items.map((item, index: number) => `item-${index}` as NameItemTableSelected);

  selectedItems.value = valueOfCheckbox ? currentSelectedItems : [];
};

watch(
  () => props.checkboxSelectAllValue,
  (value: boolean | null) => selectAllItems(value)
);
</script>

<template>
  <IndexTableEmptyMessage
    v-if="!items.length && showNotFoundMessageForFilter"
    class="ui-index-table-empty-message"
    @reset-filters="emit('reset-filters')" />
  <Table v-else class="ui-index-table-list">
    <template #header>
      <TableHeadCell v-if="show.select"></TableHeadCell>

      <TableHeadCell
        v-for="(fieldHead, index) in fields"
        :key="index"
        :data-test-index-table="`head-${fieldHead.key}`"
        class="ui-index-table-list-head-cell">
        <slot
          v-if="slots[`head(${fieldHead.key})`]"
          :name="`head(${fieldHead.key})`"
          :field="fieldHead"
          :label="fieldHead.label"></slot>

        <div v-else>{{ fieldHead.label }}</div>
      </TableHeadCell>
    </template>

    <TableBody class="ui-index-table-body">
      <TableRow
        v-for="(item, indexRow) in items"
        :key="indexRow"
        class="ui-index-table-row"
        :data-test-index-table="`row-${indexRow}`"
        tabindex="0"
        @click="emit('open-item', item)"
        @keyup.enter="emit('open-item', item)">
        <TableCell v-if="show.select" class="ui-index-table-list-all-items-checkbox">
          <FormCheckbox
            :id="`item-${indexRow}`"
            v-model="selectedItems"
            :value="`item-${indexRow}`"
            data-test-index-table="cell-checkbox"
            class="ui-index-table-list-checkbox"
            @update="selectItem" />
        </TableCell>

        <TableCell
          v-for="(cell, indexCell) in prepareKeysToCell(item)"
          :key="indexCell"
          :data-test-index-table="`cell-${cell.key}`"
          :class="`ui-index-table-list-cell-${cell.key}`">
          <slot v-if="slots[`cell(${cell.key})`]" :name="`cell(${cell.key})`" :item="item" :row="indexRow"></slot>

          <div v-else>{{ cell.value }}</div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style lang="scss" scoped>
@import './IndexTableList.scss';
</style>
