import Content403 from './Content403.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Errors/403',
  component: Content403,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Content403 },
  setup() {
    return { args };
  },
  template: `
    <Content403 v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {};
