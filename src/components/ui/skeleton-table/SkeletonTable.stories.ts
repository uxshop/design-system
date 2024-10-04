import type { Meta, StoryObj } from '@storybook/vue3';

import SkeletonTable from './SkeletonTable.vue';

const meta = {
  title: 'Ui/Skeleton/Table',
  component: SkeletonTable,
  tags: ['autodocs'],
  args: {
    cols: 5,
    hideHeader: false,
    lines: 7,
    noBorder: false,
    padding: '14px',
    rows: 3,
    width: '75%',
    withAction: false,
    withAvatar: false,
  },
  argTypes: {
    cols: {
      control: 'number',
      description: 'number | string',
    },
    lines: {
      control: 'number',
      description: 'string | number',
    },
    rows: {
      control: 'number',
      description: 'number | string',
    },
    withAction: {
      description: 'boolean | string | number',
    },
  },
} satisfies Meta<typeof SkeletonTable>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {},
};
