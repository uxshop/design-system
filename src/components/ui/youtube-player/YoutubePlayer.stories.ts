import type { Meta, StoryObj } from '@storybook/vue3';

import YoutubePlayer from './YoutubePlayer.vue';

const meta = {
  title: 'Ui/Youtube Player',
  component: YoutubePlayer,
  tags: ['autodocs'],
  args: {
    videoId: 'MEaKxCXBUFw',
    width: undefined,
    height: undefined,
  },
  argTypes: {
    videoId: {
      description: 'link after "watch?v="',
    },
    width: {
      description: 'number | string',
      control: 'numberrel',
    },
    height: {
      description: 'number | string',
      control: 'numberrel',
    },
  },
} satisfies Meta<typeof YoutubePlayer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};
