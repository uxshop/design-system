import type { Meta, StoryObj } from '@storybook/vue3';
import TabItem from './TabItem.vue';

import Tab from './Tab.vue';

const meta = {
  title: 'Ui/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    modelValue: 'null',
  },
  argTypes: {},
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render: (args) => ({
    components: { Tab, TabItem },
    setup() {
      let tab = 'main';
      return { args, tab };
    },
    template: `
    <Tab v-bind="args" v-model="tab" >
      <TabItem label="Tab item" index="main" />
      <TabItem label="Tab item" badge="badge" index="second" />
      <TabItem label="Tab item" index="third" />
    </Tab>`,
  }),
};
