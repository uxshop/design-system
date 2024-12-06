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
      label: 'Produtos ativos',
      key: 'active_products',
      active: false,
    },
    {
      label: 'Produtos inativos',
      key: 'inactive_products',
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
