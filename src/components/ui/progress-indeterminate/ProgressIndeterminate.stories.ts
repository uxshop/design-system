import type { Meta, StoryObj } from '@storybook/vue3';

import ProgressIndeterminate from './ProgressIndeterminate.vue';

const meta = {
  title: 'Ui/Progress Indeterminate',
  component: ProgressIndeterminate,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof ProgressIndeterminate>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {},
};
