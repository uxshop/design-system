<script setup lang="ts" generic="T extends object">
import { ref, watch } from 'vue';
import IndexTableActions from './IndexTableActions.vue';
import IndexTableList from './IndexTableList.vue';
import IndexTableTabs from './IndexTableTabs.vue';
import type { IndexTableEmits, IndexTableProps, IndexTableSlots, NameItemTableSelected } from './types';
import { onMounted } from 'vue';

const props = withDefaults(defineProps<IndexTableProps<T>>(), {
  show: () => ({
    tabs: true,
    select: true,
    reload: true,
    search: true,
    customFilters: true,
    filters: true,
    bulkActionDelete: true,
  }),
  checkboxSelectAllValue: false,
});
const emit = defineEmits<IndexTableEmits>();
defineSlots<IndexTableSlots<T>>();

const checkboxAllSelected = ref<boolean | null>(false);

const openTab = (key: string) => emit('open-tab', key);
const search = (word: string) => emit('search', word);
const orderBy = (key: string) => emit('order-by', key);
const bulkAction = (action: string) => emit('bulk-action', action);
const selectedItems = (items: NameItemTableSelected[]) => emit('selected-items', items);

const selectedAllItems = (value: boolean | null) => {
  checkboxAllSelected.value = value;
};
const selectAll = (value: boolean | null) => {
  checkboxAllSelected.value = value;
  emit('select-all', value);
};

onMounted(() => (checkboxAllSelected.value = props.checkboxSelectAllValue));
watch(
  () => props.checkboxSelectAllValue,
  (value: boolean | null) => (checkboxAllSelected.value = value)
);
</script>

<template>
  <div class="ui-index-table">
    <IndexTableTabs v-if="show.tabs" :tabs @open-tab="openTab" />

    <IndexTableActions
      :show="{
        select: show.select,
        reload: show.reload,
        search: show.search,
        customFilters: show.customFilters,
        filters: show.filters,
        bulkActionDelete: show.bulkActionDelete,
      }"
      :ordination
      :pagination
      :active-filter-tags
      :is-loading
      :bulk-actions
      :search-value
      :checkbox-select-all-value="checkboxAllSelected"
      @select-all="selectAll"
      @clear-search="emit('clear-search')"
      @reload="emit('reload')"
      @filters="emit('filters')"
      @search="search"
      @order-by="orderBy"
      @next-page="emit('next-page')"
      @previous-page="emit('previous-page')"
      @delete-selected-items="emit('delete-selected-items')"
      @bulk-action="bulkAction">
      <template v-for="(slotContent, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
        <component :is="slotContent" v-bind="slotProps" />
      </template>
    </IndexTableActions>

    <IndexTableList
      :items
      :fields
      :checkbox-select-all-value="checkboxAllSelected"
      :show="{ select: show.select }"
      @selected-items="selectedItems"
      @selected-all-items="selectedAllItems">
      <template v-for="(slotContent, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
        <component :is="slotContent" v-bind="slotProps" />
      </template>
    </IndexTableList>
  </div>
</template>
