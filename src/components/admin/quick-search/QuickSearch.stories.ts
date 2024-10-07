import type { Meta, StoryObj } from '@storybook/vue3';
import QuickSearch from './QuickSearch.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Admin/QuickSearch',
  component: QuickSearch,
  tags: ['autodocs'],
  args: {
    modelValue: true,
    title: 'Title',
    caption: 'Encontre os produtos e pedidos da sua loja virtual.',
    searchOptions: [
      { value: 'product', label: 'Produtos' },
      { value: 'order', label: 'Pedidos' },
    ],
  },
} satisfies Meta<typeof QuickSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
