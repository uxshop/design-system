import UiProgress from './Progress.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Progress',
  component: UiProgress,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiProgress },
  setup() {
    return { args }
  },
  template: `
    <UiProgress v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  value:"70" ,
  max:"100"
}
