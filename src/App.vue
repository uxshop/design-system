<script setup lang="ts">
import { reactive, ref } from 'vue';
import Page from './components/admin/page/Page.vue';
import IndexTable from './components/ui/index-table/IndexTable.vue';
import TextStyle from './components/ui/text-style/TextStyle.vue';
import type { IAction } from './types';

const action: IAction = {
  label: 'Bagy',
};

const show = reactive({
  tabs: true,
  select: true,
  reload: true,
  search: true,
  order: true,
  customFilters: true,
  filters: true,
  bulkActionDelete: true,
});

const tabs = [
  {
    label: 'Todos',
    key: 'all',
    active: true,
  },
  {
    label: 'Outra',
    key: 'other',
    active: false,
  },
  {
    label: 'Alguma',
    key: 'anyxpto',
    active: false,
  },
];

const ordination = [
  {
    key: 'name',
    label: 'Nome (A-z)',
    active: false,
  },
  {
    key: 'updated',
    label: 'Atualizados',
    active: false,
  },
  {
    key: 'created_at',
    label: 'Data de criação',
    active: true,
  },
];

const pagination = {
  from: 1,
  to: 25,
  size: 25,
  total: 100,
  page: 1,
};

const fields = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Nome',
  },
  {
    key: 'updated',
    label: 'Atualizado',
  },
  {
    key: 'created_at',
    label: 'Data de criação',
  },
]

const items = [
  {
    id: 1,
    name: 'Item 1',
    updated: '2021-10-01',
    created_at: '2021-10-01',
  },
  {
    id: 2,
    name: 'Item 2',
    updated: '2021-10-01',
    created_at: '2021-10-01',
  },
  {
    id: 3,
    name: 'Item 3',
    updated: '2021-10-01',
    created_at: '2021-10-01',
  },
]

const openTab = (key: string) => {
  console.info('🟣 >> openTab', key);
};

const reload = () => {
  console.info('🟣 >> reload');
};

const filters = () => {
  console.info('🟣 >> filters');
};

const clearSearch = () => {
  console.info('🟣 >> clearSearch');
};

const selectAll = (value: boolean) => {
  console.info('🟣 >> selectAll', value);
};

const search = (word: string) => {
  console.info('🟣 >> search', word);
};

const nextPage = () => {
  console.info('🟣 >> nextPage');
};

const previousPage = () => {
  console.info('🟣 >> previousPage');
};

const orderBy = (key: string) => {
  console.info('🟣 >> orderBy', key);
};

const deleteSelectedItems = () => {
  console.info('🟣 >> deleteSelectedItems');
};

const bulkAction = (action: string) => {
  console.info('🟣 >> bulkAction', action);
};

const checkboxValue = ref<boolean | null>(null);
setTimeout(() => {
  checkboxValue.value = true;
}, 5000);
</script>

<template>
  <Page title="Bagy Design System" size="full" :primary-action="action">
    <TextStyle variant="muted">Inicie seus testes por aqui...</TextStyle>
    <IndexTable
      :items
      :fields
      :show
      :tabs
      :ordination
      :pagination
      :active-filter-tags="[]"
      :bulk-actions="[
        { label: 'Ativar registros', key: 'activate-records' },
        { label: 'Inativar registros', key: 'inactivate-records' },
      ]"
      :is-loading="false"
      :checkbox-select-all-value="checkboxValue"
      @open-tab="openTab"
      @reload="reload"
      @filters="filters"
      @search="search"
      @clear-search="clearSearch"
      @select-all="selectAll"
      @next-page="nextPage"
      @previous-page="previousPage"
      @order-by="orderBy"
      @delete-selected-items="deleteSelectedItems"
      @bulk-action="bulkAction" />
  </Page>
</template>

<style lang="scss">
@import './scss/theme.scss';
</style>
