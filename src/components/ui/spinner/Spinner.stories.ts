import type { Meta, StoryObj } from '@storybook/vue3';

import { VariantStandard } from '#ds/constants';
import type { VariantsStandard } from '#ds/types';
import Spinner from './Spinner.vue';

const variants: VariantsStandard[] = [
  VariantStandard.DEFAULT,
  VariantStandard.HIGHLIGHT,
  VariantStandard.SUCCESS,
  VariantStandard.WARNING,
  VariantStandard.CRITICAL,
];

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
      options: variants,
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
    variant: VariantStandard.HIGHLIGHT,
  },
};

export const warning: Story = {
  args: {
    variant: VariantStandard.WARNING,
  },
};

export const success: Story = {
  args: {
    variant: VariantStandard.SUCCESS,
  },
};

export const critical: Story = {
  args: {
    variant: VariantStandard.CRITICAL,
  },
};
