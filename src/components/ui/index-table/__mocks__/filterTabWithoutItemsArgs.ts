import type { IndexTableProps } from '../types';
import { completeIndexTableProps, type ItemInTable } from './completeIndexTableArgs';

export const filterTabWithoutItemsIndexTableProps: IndexTableProps<ItemInTable> = {
  ...completeIndexTableProps,
  items: [],
  emptyResultDisplay: {
    show: true,
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
};
