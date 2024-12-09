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
    key: 'order_by_name',
    label: 'Nome (A-z)',
    active: false,
  },
  {
    key: 'order_by_updated',
    label: 'Data de atualização',
    active: false,
  },
  {
    key: 'order_by_created_at',
    label: 'Data de criação',
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
  activeFilterTags: [{ key: ordination[0].key, label: ordination[0].label }],
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

export const orderByName = (args: IndexTableProps<ItemSortItemsInTable>) => {
  const items = args.items!.sort((a, b) => a.name.localeCompare(b.name));
  args.items = items;
};

const orderByUpdated = (args: IndexTableProps<ItemSortItemsInTable>) => {
  const items = args.items!.sort((a, b) => a.updated.localeCompare(b.updated));
  args.items = items;
};

const orderByCreated = (args: IndexTableProps<ItemSortItemsInTable>) => {
  const items = args.items!.sort((a, b) => a.created_at.localeCompare(b.created_at));
  args.items = items;
};

export const wrapperOrderBy = (key: string, args: IndexTableProps<ItemSortItemsInTable>) => {
  args.isInternalLoading = true;
  console.info('Ordering by >>>>', key);
  const currentOrdination = args.ordination;

  const newOrdination = currentOrdination!.map((item) => {
    if (item.key === key) {
      item.active = !item.active;
    }
    return item;
  });

  args.activeFilterTags = [{ key, label: args.ordination!.find((item) => item.key === key)!.label }];

  if (key === 'order_by_name') {
    orderByName(args);
  }

  if (key === 'order_by_updated') {
    orderByUpdated(args);
  }

  if (key === 'order_by_created_at') {
    orderByCreated(args);
  }

  args.ordination = newOrdination;

  setTimeout(() => {
    args.isInternalLoading = false;
  }, 1000);
};
