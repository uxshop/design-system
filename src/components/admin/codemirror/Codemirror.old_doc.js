import Codemirror from './Codemirror.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Codemirror',
  component: Codemirror,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Codemirror },
  setup() {
    return { args };
  },
  template: `
    <Codemirror v-bind="args">
      Loren ipsum
    </Codemirror>
  `,
});

export const Default = Template.bind({});
Default.args = {};
