<script setup lang="ts" generic="T extends object">
import { ref, watch } from 'vue';
import Card from '../card/Card.vue';
import SkeletonTable from '../skeleton-table/SkeletonTable.vue';
import IndexTableActions from './actions/IndexTableActions.vue';
import IndexTableList from './list/IndexTableList.vue';
import IndexTablePaginationItem from './actions/IndexTablePaginationItem.vue';
import IndexTableTabs from './tabs/IndexTableTabs.vue';

import { onMounted, onUnmounted } from 'vue';
import type { IndexTableEmits, IndexTableProps, IndexTableSlots, KeyLabelDefault } from './types';

const props = withDefaults(defineProps<IndexTableProps<T>>(), {
  show: () => ({
    tabs: true,
    select: true,
    reload: true,
    search: true,
    filters: true,
    bulkActionDelete: true,
  }),
  ordination: null,
  pagination: () => ({
    page: 1,
    size: 25,
    total: 100,
    from: 1,
    to: 25,
  }),
  bulkActions: () => [],
  activeFilterTags: () => [],
  checkboxSelectAllValue: false,
  isInternalLoading: false,
  searchValue: '',
  headClass: null,
  cellClass: null,
});
const emit = defineEmits<IndexTableEmits<T>>();
defineSlots<IndexTableSlots<T>>();

const checkboxAllSelected = ref<boolean | null>(false);

const openTab = (key: string) => emit('open-tab', key);
const search = (word: string) => emit('search', word);
const orderBy = (key: string) => emit('order-by', key);
const bulkAction = (action: string) => emit('bulk-action', action);
const selectedItems = (items: T[]) => emit('selected-items', items);
const removeFilter = (tag: KeyLabelDefault) => emit('remove-filter', tag);
const openItem = (item: T) => emit('open-item', item);

const selectedAllItems = (value: boolean | null) => {
  checkboxAllSelected.value = value;
};
const selectAll = (value: boolean | null) => {
  checkboxAllSelected.value = value;
  emit('select-all', value);
};

const isMobileView = ref(false);

const checkScreenWidth = () => {
  isMobileView.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);

  checkboxAllSelected.value = props.checkboxSelectAllValue;
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth);
});

watch(
  () => props.checkboxSelectAllValue,
  (value: boolean | null) => (checkboxAllSelected.value = value)
);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Card v-if="isLoading" class="table-list-skeleton" no-padding>
    <SkeletonTable cols="4" rows="4" />
  </Card>
  <div v-else>
    <div :class="{ 'ui-index-table': true, '-mobile': isMobileView }" v-bind="$attrs">
      <div class="ui-index-table-wrapper">
        <div class="ui-index-table-header">
          <IndexTableTabs v-if="show.tabs" :tabs @open-tab="openTab" />

          <IndexTableActions
            :show="{
              select: show.select,
              reload: show.reload,
              search: show.search,
              filters: show.filters,
              bulkActionDelete: show.bulkActionDelete,
            }"
            :ordination
            :pagination
            :active-filter-tags
            :bulk-actions
            :search-value
            :show-not-found-message-for-filter
            :is-internal-loading
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
            @bulk-action="bulkAction"
            @remove-filter="removeFilter">
            <template v-for="(slotContent, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
              <component :is="slotContent" v-bind="slotProps" />
            </template>
          </IndexTableActions>
        </div>

        <IndexTableList
          :items
          :fields
          :checkbox-select-all-value="checkboxAllSelected"
          :show-not-found-message-for-filter
          :show="{ select: show.select }"
          :head-class
          :cell-class
          class="ui-index-table-list"
          :class="{ '-without-border-top': activeFilterTags.length === 0 && !isInternalLoading }"
          @open-item="openItem"
          @selected-items="selectedItems"
          @selected-all-items="selectedAllItems"
          @reset-filters="emit('reset-filters')">
          <template v-for="(slotContent, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
            <component :is="slotContent" v-bind="slotProps" />
          </template>
        </IndexTableList>
      </div>
    </div>

    <footer id="footer-table" class="ui-index-table-footer">
      <IndexTablePaginationItem
        v-if="pagination && !isLoading && isMobileView"
        class="-footer"
        :is-internal-loading
        :page="pagination.page"
        :size="pagination.size"
        :total="pagination.total"
        :from="pagination.from"
        :to="pagination.to"
        @next-page="emit('next-page')"
        @previous-page="emit('previous-page')" />
      <slot name="footer-actions" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import './IndexTable.scss';
</style>
