import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';

const meta = {
  title: 'Ui/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: 'Toast message',
    duration: 2000,
    variant: 'default',
    closeable: false,
    className: undefined,
    id: undefined,
  },
  argTypes: {
    duration: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'critical', 'warning', 'highlight'],
    },
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof meta>;

export default meta;

export const minimum: Story = {
  args: {},
};

export const closeable: Story = {
  args: {
    closeable: true,
  },
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
