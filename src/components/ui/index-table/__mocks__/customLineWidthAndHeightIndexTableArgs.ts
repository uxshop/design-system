import type { IndexTableProps } from '../types';
import { completeIndexTableProps, type ItemInTable } from './completeIndexTableArgs';

const items = [
  { id: 1, name: 'Smartphone Samsung Galaxy A10', price: 'R$ 1.000,00' },
  { id: 2, name: 'Iphone 11', price: 'R$ 5.000,00' },
  { id: 3, name: 'Motorola Moto G', price: 'R$ 1.200,00' },
  { id: 4, name: 'Samsung Galaxy S21', price: 'R$ 2.000,00' },
  { id: 5, name: 'Iphone 12', price: 'R$ 6.000,00' },
  { id: 6, name: 'Motorola Edge', price: 'R$ 3.000,00' },
  { id: 7, name: 'Logitech MX Master 3', price: 'R$ 500,00' },
  { id: 8, name: 'Logitech K380 Keyboard', price: 'R$ 250,00' },
  { id: 9, name: 'Logitech G502 Mouse', price: 'R$ 350,00' },
  { id: 10, name: 'Logitech G Pro Keyboard', price: 'R$ 600,00' },
  { id: 11, name: 'Logitech C920 Webcam', price: 'R$ 400,00' },
  { id: 12, name: 'Logitech Z906 Speakers', price: 'R$ 1.500,00' },
  { id: 13, name: 'Logitech G733 Headset', price: 'R$ 800,00' },
  { id: 14, name: 'Logitech G915 Keyboard', price: 'R$ 1.200,00' },
  { id: 15, name: 'Logitech G305 Mouse', price: 'R$ 300,00' },
  { id: 16, name: 'Logitech G Pro X Headset', price: 'R$ 900,00' },
  { id: 17, name: 'Logitech G560 Speakers', price: 'R$ 1.000,00' },
  { id: 18, name: 'Logitech G815 Keyboard', price: 'R$ 1.100,00' },
  { id: 19, name: 'Logitech G903 Mouse', price: 'R$ 700,00' },
  { id: 20, name: 'Logitech G432 Headset', price: 'R$ 500,00' },
  { id: 21, name: 'Logitech G213 Keyboard', price: 'R$ 400,00' },
  { id: 22, name: 'Logitech G600 Mouse', price: 'R$ 450,00' },
  { id: 23, name: 'Logitech G935 Headset', price: 'R$ 1.000,00' },
  { id: 24, name: 'Logitech G910 Keyboard', price: 'R$ 800,00' },
  { id: 25, name: 'Logitech G203 Mouse', price: 'R$ 250,00' },
];

export const customLineWidthAndHeightIndexTableProps: IndexTableProps<ItemInTable> = {
  ...completeIndexTableProps,
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    }
  ],
  activeFilterTags: [],
  items,
  pagination: {
    from: 1,
    to: 25,
    size: 25,
    total: 25,
    page: 1,
  },
  headClass: {
    'custom-width': true,
  },
  cellClass: {
    'custom-cell': true,
  },
};

