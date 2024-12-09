import type { IndexTableProps } from '../types';
import { completeIndexTableProps, type ItemInTable } from './completeIndexTableArgs';

const itemsPage1 = [
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

const itemsPage2 = [
  { id: 26, name: 'LG UltraGear Monitor', price: 'R$ 2.500,00' },
  { id: 27, name: 'LG Gram Laptop', price: 'R$ 8.000,00' },
  { id: 28, name: 'LG 4K Monitor', price: 'R$ 3.000,00' },
  { id: 29, name: 'LG UltraWide Monitor', price: 'R$ 2.800,00' },
  { id: 30, name: 'LG 24MP88HV-S Monitor', price: 'R$ 1.200,00' },
  { id: 31, name: 'LG 27GL850 Monitor', price: 'R$ 2.200,00' },
  { id: 32, name: 'LG 32UL950-W Monitor', price: 'R$ 4.000,00' },
  { id: 33, name: 'LG 34WK95U-W Monitor', price: 'R$ 5.000,00' },
  { id: 34, name: 'LG 38WK95C-W Monitor', price: 'R$ 6.000,00' },
  { id: 35, name: 'LG 49WL95C-W Monitor', price: 'R$ 7.000,00' },
  { id: 36, name: 'Dell XPS 13 Laptop', price: 'R$ 10.000,00' },
  { id: 37, name: 'Dell Inspiron 15 Laptop', price: 'R$ 4.500,00' },
  { id: 38, name: 'Dell G5 15 Laptop', price: 'R$ 6.000,00' },
  { id: 39, name: 'Dell Alienware m15 Laptop', price: 'R$ 12.000,00' },
  { id: 40, name: 'Dell Latitude 7400 Laptop', price: 'R$ 9.000,00' },
  { id: 41, name: 'Dell Precision 5540 Laptop', price: 'R$ 11.000,00' },
  { id: 42, name: 'Dell UltraSharp Monitor', price: 'R$ 3.500,00' },
  { id: 43, name: 'Dell P2419H Monitor', price: 'R$ 1.500,00' },
  { id: 44, name: 'Dell S2719DGF Monitor', price: 'R$ 2.000,00' },
  { id: 45, name: 'Dell U2718Q Monitor', price: 'R$ 3.000,00' },
  { id: 46, name: 'Dell U3419W Monitor', price: 'R$ 4.500,00' },
  { id: 47, name: 'Dell U4919DW Monitor', price: 'R$ 6.500,00' },
  { id: 48, name: 'Dell Pro Stereo Soundbar', price: 'R$ 800,00' },
  { id: 49, name: 'Dell Professional Soundbar', price: 'R$ 1.000,00' },
  { id: 50, name: 'Dell AE515M Soundbar', price: 'R$ 600,00' },
];

const itemsPage3 = [
  { id: 51, name: 'Sony WH-1000XM4 Headphones', price: 'R$ 1.500,00' },
  { id: 52, name: 'Bose QuietComfort 35 II', price: 'R$ 1.200,00' },
  { id: 53, name: 'Apple AirPods Pro', price: 'R$ 1.800,00' },
  { id: 54, name: 'Samsung Galaxy Buds Pro', price: 'R$ 1.000,00' },
  { id: 55, name: 'JBL Charge 4 Speaker', price: 'R$ 600,00' },
  { id: 56, name: 'Amazon Echo Dot', price: 'R$ 300,00' },
  { id: 57, name: 'Google Nest Hub', price: 'R$ 700,00' },
  { id: 58, name: 'Fitbit Charge 4', price: 'R$ 800,00' },
  { id: 59, name: 'Garmin Forerunner 245', price: 'R$ 1.200,00' },
  { id: 60, name: 'Apple Watch Series 6', price: 'R$ 3.000,00' },
];

export const paginationChangeIndexTableProps: IndexTableProps<ItemInTable> = {
  ...completeIndexTableProps,
  tabs: [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    }
  ],
  activeFilterTags: [],
  items: itemsPage1,
  pagination: {
    from: 1,
    to: 25,
    size: 25,
    total: itemsPage1.length + itemsPage2.length + itemsPage3.length,
    page: 1,
  }
};

export const handlePageChange = (args: IndexTableProps<ItemInTable>, event: 'next-page' | 'previous-page') => {
  console.info("Evento disparado:", event)
  args.isInternalLoading = true;
  const currentPage = args.pagination?.page || 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = args.pagination?.to === args.pagination?.total;

  setTimeout(() => {
    if (event === 'next-page' && !isLastPage) {
      args.pagination!.page = currentPage + 1;
    } else if (event === 'previous-page' && !isFirstPage) {
      args.pagination!.page = currentPage - 1;
    }

    if (args.pagination!.page === 1) {
      args.items = itemsPage1;
      args.pagination!.from = 1;
      args.pagination!.to = 25;
    } else if (args.pagination!.page === 2) {
      args.items = itemsPage2;
      args.pagination!.from = 26;
      args.pagination!.to = 50;
    } else if (args.pagination!.page === 3) {
      args.items = itemsPage3;
      args.pagination!.from = 51;
      args.pagination!.to = 60;
    }

    args.isInternalLoading = false;
  }, 1000);
};

