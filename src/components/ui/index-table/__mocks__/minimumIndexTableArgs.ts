import type { IndexTableProps } from '../types';
import type { ItemInTable } from './completeIndexTableArgs';

export const minimumIndexTableProps: IndexTableProps<ItemInTable> = {
  show: {
    tabs: false,
    select: false,
    reload: false,
    search: false,
    filters: false,
    bulkActionDelete: false,
  },
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: false,
    },
    {
      label: 'Produtos ativos',
      key: 'active_products',
      active: true,
    },
    {
      label: 'Produtos inativos',
      key: 'inactive_products',
      active: false,
    },
  ],
  ordination: null,
  pagination: {
    from: 1,
    to: 3,
    size: 25,
    total: 3,
    page: 1,
  },
  bulkActions: [],
  activeFilterTags: [],
  searchValue: '',
  checkboxSelectAllValue: false,
  emptyResultDisplay: {
    show: false,
  },
  isLoading: false,
  isInternalLoading: false,
  items: [
    { id: 1, name: 'Produto 1', price: 'R$ 10,00' },
    { id: 2, name: 'Produto 2', price: 'R$ 20,00' },
    { id: 3, name: 'Produto 3', price: 'R$ 30,00' },
  ],
  fields: [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Nome',
    },
    {
      key: 'price',
      label: 'Preço',
    },
  ],
};
