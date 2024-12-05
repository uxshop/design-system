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
    customFilters: true,
    filters: true,
    bulkActionDelete: true,
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
  bulkActions: [
    { label: 'Ativar registros', key: 'activate-records' },
    { label: 'Inativar registros', key: 'inactivate-records' },
  ],
  activeFilterTags: [{ key: 'active', label: 'Ativo' }],
  searchValue: '',
  checkboxSelectAllValue: false,
  showNotFoundMessageForFilter: false,
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
};

export const completeIndexTableSlots = {
  slots: {
    // actions: 'Default Actions Content',
    // 'action-pagination': 'Default Header Content',
    // 'bulk-actions': 'Default Footer Content',
    // `cell(${field.key})`: 'Teste XPTO',
    // `header(${field.key})`: 'Teste XPTO',
    // `footer-actions`: 'Teste XPTO',
  },
};
