import type { Meta, StoryObj } from '@storybook/vue3';

import { VariantStandard } from '#ds/constants';
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
      options: [
        VariantStandard.DEFAULT,
        VariantStandard.HIGHLIGHT,
        VariantStandard.SUCCESS,
        VariantStandard.WARNING,
        VariantStandard.CRITICAL,
      ],
    },
  },
} satisfies Meta<typeof Tag>;

type Story = StoryObj<typeof meta>;

export default meta;

export const minimum: Story = {};

export const highlight: Story = {
  args: {
    variant: VariantStandard.HIGHLIGHT,
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
