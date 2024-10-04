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
      options: ['default', 'highlight', 'warning', 'success', 'critical'],
    },
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {},
};

export const Closeable: Story = {
  args: {
    closeable: true,
  },
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
  },
};
