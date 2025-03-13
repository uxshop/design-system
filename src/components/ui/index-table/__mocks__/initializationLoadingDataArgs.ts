import type { IndexTableProps } from '../types';
import { completeIndexTableProps, type ItemInTable } from './completeIndexTableArgs';

export const initializationLoadingDataTableProps: IndexTableProps<ItemInTable> = {
  ...completeIndexTableProps,
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    },
    {
      label: 'Ativos',
      key: 'active',
      active: false,
    },
    {
      label: 'Inativos',
      key: 'inactive',
      active: false,
    },
  ],
  activeFilterTags: [],
  isLoading: true,
};

export const changeLoading = (args: IndexTableProps<ItemInTable>) => {
  setTimeout(() => {
    args.isLoading = false;
  }, 3000);
};
