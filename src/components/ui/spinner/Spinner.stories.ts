import type { Meta, StoryObj } from '@storybook/vue3';

import Spinner from './Spinner.vue';

const meta = {
  title: 'Ui/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    border: 3,
    size: 30,
    variant: 'default',
    color: undefined,
  },
  argTypes: {
    border: { control: 'number', description: 'number | string' },
    size: { control: 'number', description: 'number | string' },
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'warning', 'critical', 'success'],
    },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export default meta;

export const minimum: Story = {
  args: {},
};

export const highlight: Story = {
  args: {
    variant: 'highlight',
  },
};

export const warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const success: Story = {
  args: {
    variant: 'success',
  },
};

export const critical: Story = {
  args: {
    variant: 'critical',
  },
};
