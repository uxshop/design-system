import type { IndexTableProps } from '../types';

export const completeIndexTableProps: IndexTableProps = {
  tabs: [
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
    { label: 'Alguma', key: 'any', active: false },
  ],
  show: {
    select: true,
    reload: true,
    search: true,
    order: true,
    customFilters: true,
    filters: true,
  },
  ordination: [
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
  ],
  pagination: {
    from: 1,
    to: 25,
    size: 25,
    total: 100,
    page: 1,
  },
  bulkActions: [],
  activeFilterTags: [],
  isLoading: false,
};
