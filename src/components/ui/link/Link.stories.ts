import type { Meta, StoryObj } from '@storybook/vue3';

import Link from './Link.vue';

const meta = {
  title: 'Ui/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    disabled: false,
    external: false,
    href: 'https://bagy.com.br',
    label: 'Link',
    to: undefined,
  },
  argTypes: {
    to: {
      description: 'vue-router redirect',
    },
  },
} satisfies Meta<typeof Link>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Internal: Story = {
  args: {
    external: false,
  },
};

export const External: Story = {
  args: {
    external: true,
  },
};

export const Disabled: Story = {
  args: {
    external: true,
    disabled: true,
  },
};
