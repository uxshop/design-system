import type { Meta, StoryObj } from '@storybook/vue3';

import Avatar from './Avatar.vue';

const meta = {
  title: 'Ui/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    title: 'My Avatar',
    size: 48,
    label: '',
    variant: '',
    src: 'https://placehold.co/48x48',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['', 'highlight', 'success'],
    },
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    label: 'AC',
    src: undefined,
  },
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};
