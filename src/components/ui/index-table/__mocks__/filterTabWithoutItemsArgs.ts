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
      label: 'Ativos',
      key: 'active',
      active: true,
    },
    {
      label: 'Inativos',
      key: 'inactive',
      active: false,
    },
  ],
};
