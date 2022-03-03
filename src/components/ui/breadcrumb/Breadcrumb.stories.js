import UiBreadcrumb from './Breadcrumb.vue'
import UiBreadcrumbItem from './BreadcrumbItem.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Breadcrumb',
  component: UiBreadcrumb,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    onClick: {},
  },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiBreadcrumb, UiBreadcrumbItem },
  setup() {
    return { args }
  },
  template: `
    <ui-breadcrumb v-bind="args">
      <ui-breadcrumb-item :to="{}">Item</ui-breadcrumb-item>
      <ui-breadcrumb-item :to="{}">Item2</ui-breadcrumb-item>
      <ui-breadcrumb-item :to="{}">Item3</ui-breadcrumb-item>
    </ui-breadcrumb>
  `,
})

export const Default = Template.bind({})
Default.args = {
}

Default.decorators = [
  vueRouter()
]
