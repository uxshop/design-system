import UiSkeletonTable from './SkeletonTable.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/SkeletonTable',
  component: UiSkeletonTable,
  argTypes: {},
  args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiSkeletonTable },
  setup() {
    return { args }
  },
  template: `
    <ui-skeleton-table v-bind="args" /> 
  `,
})

export const Default = Template.bind({})
Default.args = {
}
