<script setup lang="ts">
import IndexTableActions from './IndexTableActions.vue';
import IndexTableTabs from './IndexTableTabs.vue';
import type { IndexTableEmits, IndexTableProps } from './types';

defineProps<IndexTableProps>();
const emit = defineEmits<IndexTableEmits>();

const openTab = (key: string) => emit('open-tab', key);
const selectAll = (value: boolean) => emit('select-all', value);
</script>

<template>
  <div class="index-table">
    <IndexTableTabs :tabs @open-tab="openTab" />

    <IndexTableActions
      :show
      :ordination
      :pagination
      :active-filter-tags
      :is-loading
      :bulk-actions
      @select-all="selectAll"
      @clear-search="emit('clear-search')"
      @reload="emit('reload')"
      @filters="emit('filters')"
      @next-page="emit('next-page')"
      @previous-page="emit('previous-page')" />
  </div>
</template>
