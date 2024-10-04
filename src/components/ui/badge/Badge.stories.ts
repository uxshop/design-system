import type { Meta, StoryObj } from '@storybook/vue3';

import Badge from './Badge.vue';

const meta = {
  title: 'Ui/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    label: 'Badge label',
    pill: false,
    size: 'md',
    variant: 'default',
  },
  argTypes: {
    label: {
      description: 'string | number',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'warning', 'success', 'critical'],
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    pill: true,
    size: 'md',
  },
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
    pill: true,
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    pill: true,
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    pill: true,
    size: 'md',
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    pill: true,
    size: 'md',
  },
};
