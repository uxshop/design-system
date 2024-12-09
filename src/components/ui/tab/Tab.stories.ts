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

export const minimum: Story = {
  render: (args) => ({
    components: { Tab, TabItem },
    setup() {
      const tab = 'main';
      return { args, tab };
    },
    template: `
    <Tab v-bind="args" v-model="tab" >
      <TabItem label="Tab item" index="main" />
      <TabItem label="Tab item" badge="Badge" index="second" />
      <TabItem label="Tab item" index="third" />
    </Tab>`,
  }),
};

export const withDisabled: Story = {
  render: (args) => ({
    components: { Tab, TabItem },
    setup() {
      const tab = 'second';
      return { args, tab };
    },
    template: `
    <Tab v-bind="args" v-model="tab" >
      <TabItem label="Tab item" index="main" />
      <TabItem label="Tab item" index="second" />
      <TabItem label="Tab item disabled" index="third" :disabled="true" />
    </Tab>`,
  }),
};
