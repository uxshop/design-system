import { completeIndexTableProps } from './__mocks__/completeIndexTableProps';
import IndexTable from './IndexTable.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof IndexTable> = {
  title: 'Components/IndexTable',
  component: IndexTable,
  render: (args) => ({
    components: { IndexTable },
    setup() {
      return { args };
    },
    template: '<IndexTable v-bind="args" />',
  }),
  argTypes: {
    show: { control: { type: 'object' } },
    pagination: { control: { type: 'object' } },
    isLoading: { control: { type: 'boolean' } },
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
  },
};
