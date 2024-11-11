import type { Meta, StoryObj } from '@storybook/vue3';
import { completeIndexTableProps } from './__mocks__/completeIndexTableProps';
import IndexTable from './IndexTable.vue';

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
  },
};
