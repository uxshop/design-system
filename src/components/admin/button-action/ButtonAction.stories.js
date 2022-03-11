import UiButtonAction from './ButtonAction.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/ButtonAction',
  component: UiButtonAction,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiButtonAction },
  setup() {
    return { args }
  },
  template: `
    <ui-button-action v-bind="args">
      meu button-action 
    </ui-button-action>
  `,
})

export const edit = Template.bind({})
edit.args = {
  type: 'edit',
}

export const active = Template.bind({})
active.args = {
  type: 'active',
}

export const Delete = Template.bind({})
Delete.args = {
  type: 'delete',
}

export const remove = Template.bind({})
remove.args = {
  type: 'remove',
}
