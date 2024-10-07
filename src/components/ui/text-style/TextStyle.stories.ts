import type { Meta, StoryObj } from '@storybook/vue3';

import TextStyle from './TextStyle.vue';

/** Component used to style text classes. */
const meta = {
  title: 'Ui/Text Style',
  component: TextStyle,
  tags: ['autodocs'],
  args: {
    block: false,
    label: 'Text style label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger', 'success', 'strong', 'muted'],
    },
  },
} satisfies Meta<typeof TextStyle>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Highlight: Story = {
  args: { variant: 'primary' },
};

export const Success: Story = {
  args: { variant: 'success' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Strong: Story = {
  args: { variant: 'strong' },
};

export const Muted: Story = {
  args: { variant: 'muted' },
};
