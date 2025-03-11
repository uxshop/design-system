import { fn } from '@storybook/test';
import type { IndexTableProps } from '../types';

export type ItemInTable = {
  id: number;
  name: string;
  price: string;
};

export const completeIndexTableProps: IndexTableProps<ItemInTable> = {
  show: {
    tabs: true,
    select: true,
    reload: true,
    search: true,
    filters: true,
    bulkActionDelete: true,
  },
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: false,
      disabled: false,
    },
    {
      label: 'Ativos',
      key: 'active',
      active: true,
      disabled: false,
    },
    {
      label: 'Inativos',
      key: 'inactive',
      active: false,
      disabled: false,
    },
  ],
  ordination: [
    {
      key: 'name|asc',
      label: 'Nome (A-z)',
      active: false,
    },
    {
      key: 'name|desc',
      label: 'Nome (Z-a)',
      active: false,
    },
    {
      key: 'price|asc',
      label: 'Preço (menor primeiro)',
      active: false,
    },
    {
      key: 'price|desc',
      label: 'Preço (maior primeiro)',
      active: false,
    },
    {
      key: 'updated|desc',
      label: 'Data de atualização (novos primeiro)',
      active: false,
    },
  ],
  pagination: {
    from: 1,
    to: 3,
    size: 25,
    total: 3,
    page: 1,
  },
  bulkActions: [
    { label: 'Ativar registros', key: 'activate-records' },
    { label: 'Inativar registros', key: 'inactivate-records' },
  ],
  activeFilterTags: [{ key: 'active', label: 'Ativo' }],
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
  headClass: {},
  cellClass: {},
};

export const completeIndexTableActions: Record<string, unknown> = {
  onClearSearch: fn(),
  onSearch: fn(),
  onReload: fn(),
  onOpenTab: fn(),
  onFilters: fn(),
  onSaveCustomFilters: fn(),
  onSelectAll: fn(),
  onDeleteSelectedItems: fn(),
  onBulkAction: fn(),
  onNextPage: fn(),
  onPreviousPage: fn(),
  onOrderBy: fn(),
  onSelectedItems: fn(),
  onRemoveFilter: fn(),
  onResetFilters: fn(),
  onOpenItem: fn(),
};
