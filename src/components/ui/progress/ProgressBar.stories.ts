import type { Meta, StoryObj } from '@storybook/vue3';

import ProgressBar from './ProgressBar.vue';

const meta = {
  title: 'Ui/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    height: '5px',
    max: 100,
    value: 0,
  },
  argTypes: {
    height: { control: 'text' },
    max: { control: 'number', description: 'number | string' },
    value: { control: 'number', description: 'number | string' },
  },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    value: 100,
  },
};
