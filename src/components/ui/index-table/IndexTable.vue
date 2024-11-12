<script setup lang="ts" generic="T extends object">
import { ref } from 'vue';
import IndexTableActions from './IndexTableActions.vue';
import IndexTableList from './IndexTableList.vue';
import IndexTableTabs from './IndexTableTabs.vue';
import type { IndexTableEmits, IndexTableProps, IndexTableSlots } from './types';

withDefaults(defineProps<IndexTableProps<T>>(), {
  show: () => ({
    tabs: true,
    select: true,
    reload: true,
    search: true,
    customFilters: true,
    filters: true,
    bulkActionDelete: true,
  }),
});
const emit = defineEmits<IndexTableEmits>();
defineSlots<IndexTableSlots>();

const openTab = (key: string) => emit('open-tab', key);
const selectAll = (value: boolean | null) => emit('select-all', value);
const search = (word: string) => emit('search', word);
const orderBy = (key: string) => emit('order-by', key);
const bulkAction = (action: string) => emit('bulk-action', action);

const testKey = ref('name')
</script>

<template>
  <div class="index-table">
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
      :checkbox-select-all-value
      @select-all="selectAll"
      @clear-search="emit('clear-search')"
      @reload="emit('reload')"
      @filters="emit('filters')"
      @search="search"
      @order-by="orderBy"
      @next-page="emit('next-page')"
      @previous-page="emit('previous-page')"
      @delete-selected-items="emit('delete-selected-items')"
      @bulk-action="bulkAction" />

    <IndexTableList
      :items
      :fields
      :show="{ select: show.select }"
    >
      <template #[testKey]="{ item, row }">
        Testes {{ item.name + row }}
      </template>
    </IndexTableList>
  </div>
</template>
