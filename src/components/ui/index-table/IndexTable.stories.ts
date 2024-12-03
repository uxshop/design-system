import type { Meta, StoryObj } from '@storybook/vue3';
import {
  completeIndexTableActions,
  completeIndexTableProps,
  type ItemInTable,
} from './__mocks__/completeIndexTableProps';
import IndexTable from './IndexTable.vue';

const meta: Meta<typeof IndexTable<ItemInTable>> = {
  title: 'Components/IndexTable',
  component: IndexTable as any,
  render: (args) => ({
    components: { IndexTable },
    setup() {
      return { args };
    },
    template: '<IndexTable v-bind="args" />',
  }),
  argTypes: {
    isLoading: { control: { type: 'boolean' } },
    checkboxSelectAllValue: { control: { type: 'select' }, options: [true, false, null] },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const complete: Story = {
  args: {
    ...completeIndexTableProps,
    ...completeIndexTableActions,
  },
};
