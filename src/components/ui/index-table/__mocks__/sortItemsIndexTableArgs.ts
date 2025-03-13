import type { IndexTableProps } from '../types';
import { completeIndexTableProps } from './completeIndexTableArgs';

export interface ItemSortItemsInTable {
  id: number;
  name: string;
  price: string;
  created_at: string;
  updated: string;
}

const ordination = [
  {
    key: 'name|asc',
    label: 'Nome (A-z)',
    active: true,
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
    key: 'updated_at|desc',
    label: 'Data de atualização (recentes primeiro)',
    active: false,
  },
];

export const sortItemsIndexTableProps: IndexTableProps<ItemSortItemsInTable> = {
  ...completeIndexTableProps,
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    },
  ],
  ordination,
  activeFilterTags: [],
  items: [
    {
      id: 1,
      name: 'Smartphone Samsung Galaxy A10',
      price: 'R$ 1.000,00',
      created_at: '2021-01-01',
      updated: '2021-01-01',
    },
    { id: 2, name: 'Iphone 11', price: 'R$ 5.000,00', created_at: '2022-03-01', updated: '2022-04-01' },
    { id: 3, name: 'Motorola Moto G', price: 'R$ 1.200,00', created_at: '2022-07-01', updated: '2021-01-01' },
    { id: 4, name: 'Samsung Galaxy S21', price: 'R$ 2.000,00', created_at: '2023-09-29', updated: '2024-12-04' },
    { id: 5, name: 'Iphone 12', price: 'R$ 6.000,00', created_at: '2024-01-01', updated: '2025-01-01' },
    { id: 6, name: 'Motorola Edge', price: 'R$ 3.000,00', created_at: '2025-01-01', updated: '2024-07-08' },
  ],
};

export const orderByName = (args: IndexTableProps<ItemSortItemsInTable>, order?: string) => {
  if (!order) return;

  const items = args.items!.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return order === 'asc' ? comparison : -comparison;
  });
  args.items = items;
};

const orderByUpdated = (args: IndexTableProps<ItemSortItemsInTable>, order?: string) => {
  if (!order) return;

  const items = args.items!.sort((a, b) => {
    const comparison = a.updated.localeCompare(b.name);
    return order === 'asc' ? comparison : -comparison;
  });
  args.items = items;
};

const orderByPrice = (args: IndexTableProps<ItemSortItemsInTable>, order?: string) => {
  if (!order) return;

  const items = args.items!.sort((a, b) => {
    const comparison = a.price.localeCompare(b.name);
    return order === 'asc' ? comparison : -comparison;
  });

  args.items = items;
};

export const wrapperOrderBy = (key: string, args: IndexTableProps<ItemSortItemsInTable>) => {
  args.isInternalLoading = true;
  console.info('Ordering by >>>>', key);
  const currentOrdination = args.ordination;

  const newOrdination = currentOrdination!.map((item) => {
    return {
      ...item,
      active: item.key === key ? !item.active : false,
    };
  });

  const currentKey = key.split('|').at(0);
  const currentOrder = key.split('|').at(-1);
  if (!currentOrder) return;

  if (currentKey === 'name') {
    orderByName(args, currentOrder);
  }

  if (currentKey === 'updated_at') {
    orderByUpdated(args, currentOrder);
  }

  if (currentKey === 'price') {
    orderByPrice(args, currentOrder);
  }

  args.ordination = newOrdination;

  setTimeout(() => {
    args.isInternalLoading = false;
  }, 1000);
};
