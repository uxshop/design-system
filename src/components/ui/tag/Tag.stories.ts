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
      options: ['warning', 'success', 'danger', 'primary', 'default'],
    },
  },
} satisfies Meta<typeof Tag>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
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

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};
