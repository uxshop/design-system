import MediaCard from './MediaCard.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/** Media cards are used to effectively communicate notices, promotions or new features. */
const meta: Meta<typeof MediaCard> = {
  title: 'Components/MediaCard',
  component: MediaCard,
  args: {
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'https://picsum.photos/544/208',
    imageHref: 'https://google.com',
    buttons: [{ label: 'button', to: 'https://google.com', target: '_blank' }],
  },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {};

export const Inverse: Story = {
  args: {
    inverse: true,
  },
};

export const WithVideo: Story = {
  args: {
    inverse: true,
    video: '4CaEGG0xpMk',
  },
};
