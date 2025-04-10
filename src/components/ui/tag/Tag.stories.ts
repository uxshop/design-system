import type { Meta, StoryObj } from '@storybook/vue3';

import Tag from './Tag.vue';

const meta = {
  title: 'Ui/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    label: 'Tag label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlight', 'warning', 'critical', 'success'],
    },
  },
} satisfies Meta<typeof Tag>;

type Story = StoryObj<typeof meta>;

export default meta;

export const minimum: Story = {};

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
