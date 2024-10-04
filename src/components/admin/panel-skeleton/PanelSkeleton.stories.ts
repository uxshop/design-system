import type { Meta, StoryObj } from '@storybook/vue3';
import PanelSkeleton from './PanelSkeleton.vue';

const meta = {
  title: 'Admin/PanelSkeleton',
  component: PanelSkeleton,
  tags: ['autodocs'],
  args: {
    isLoading: true,
    delayMiliseconds: 200,
    logoImage: './logo.svg',
  },
} satisfies Meta<typeof PanelSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PanelSkeleton },
    setup() {
      return { args };
    },
    template: `
    <div>
      <PanelSkeleton v-bind="args" />
    </div>
    `,
  }),
};
