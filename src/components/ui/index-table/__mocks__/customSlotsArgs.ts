import type { IndexTableProps } from '../types';
import { completeIndexTableProps, type ItemInTable } from './completeIndexTableArgs';

export interface ItemInTableCustomSlots extends ItemInTable {
  model?: string;
  image?: string;
}

export const customSlotsIndexTableProps: IndexTableProps<ItemInTableCustomSlots> = {
  ...completeIndexTableProps,
  pagination: null,
  items: [
    {
      id: 1,
      price: 'R$ 4.400,00',
      name: 'Smartphone Iphone 12',
      model: 'Iphone',
      image: 'https://via.placeholder.com/55',
    },
    {
      id: 2,
      name: 'Smartphone Samsung Galaxy S21',
      price: 'R$ 3.200,00',
    },
    {
      name: 'Smartphone Motorola Moto G9',
      id: 3,
      price: 'R$ 1.200,00',
    },
  ],
  show: {
    tabs: true,
    select: true,
    reload: false,
    search: true,
    filters: false,
    bulkActionDelete: false,
  },
  ordination: null,
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
};
