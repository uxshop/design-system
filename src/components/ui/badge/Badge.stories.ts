import { VariantStandard } from '#ds/constants';
import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './Badge.vue';
import './VariantCustom.example.css';
import type { BadgeVariants } from './types';

const variants: BadgeVariants[] = [
  VariantStandard.DEFAULT,
  VariantStandard.HIGHLIGHT,
  VariantStandard.SUCCESS,
  VariantStandard.WARNING,
  VariantStandard.CRITICAL,
  'custom',
];

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
      options: variants,
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export default meta;

export const minimum: Story = {
  args: {
    pill: true,
    size: 'md',
  },
};

export const highlight: Story = {
  args: {
    variant: VariantStandard.HIGHLIGHT,
    pill: true,
    size: 'md',
  },
};

export const warning: Story = {
  args: {
    variant: VariantStandard.WARNING,
    pill: true,
    size: 'md',
  },
};

export const success: Story = {
  args: {
    variant: VariantStandard.SUCCESS,
    pill: true,
    size: 'md',
  },
};

export const critical: Story = {
  args: {
    variant: VariantStandard.CRITICAL,
    pill: true,
    size: 'md',
  },
};

export const custom: Story = {
  args: {
    variant: 'custom',
    pill: true,
    size: 'md',
  },
  render: (args) =>
    ({
      components: { Badge },
      setup() {
        return { args };
      },
      template: /* html */ `
        <Badge v-bind="args" /><br>
        <pre>
        // CSS adicionado para personalizar a cor do badge:
        .ui-badge.-variant-custom {
          background-color: #9747ff;
        }
        </pre>
      `,
    }) as any,
};
