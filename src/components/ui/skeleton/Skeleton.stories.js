import UiSkeleton from './Skeleton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Skeleton',
  component: UiSkeleton,
  argTypes: {},
  args: {
    text: 'MB'
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiSkeleton },
  setup() {
    return { args }
  },
  template: `
    <ui-Skeleton v-bind="args" /> 
  `,
})

export const Default = Template.bind({})
Default.args = {
}
