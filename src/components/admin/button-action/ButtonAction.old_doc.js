import ButtonAction from './ButtonAction.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/ButtonAction',
  component: ButtonAction,
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { ButtonAction },
  setup() {
    return { args };
  },
  template: `
    <ButtonAction v-bind="args">
      meu ButtonAction 
    </ButtonAction>
  `,
});

export const edit = Template.bind({});
edit.args = {
  type: 'edit',
};

export const active = Template.bind({});
active.args = {
  type: 'active',
};

export const Delete = Template.bind({});
Delete.args = {
  type: 'delete',
};

export const remove = Template.bind({});
remove.args = {
  type: 'remove',
};
