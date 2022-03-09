import UiAvatar from './Avatar.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Avatar',
  component: UiAvatar,
  argTypes: {},
  args: {
    text: 'MB'
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiAvatar },
  setup() {
    return { args }
  },
  template: `
    <ui-avatar v-bind="args" /> 
  `,
})

export const Default = Template.bind({})
Default.args = {
  size: 60
}
