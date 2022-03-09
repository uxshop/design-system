import UiPagination from './Pagination.vue'
import UiPaginationItem from './PaginationItem.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Pagination',
  component: UiPagination,
  argTypes: {},
  args: {
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { UiPagination, UiPaginationItem },
  setup() {
    return { args }
  },
  template: `
    <ui-pagination v-bind="args">
      <ui-pagination-item disabled>1</ui-pagination-item>
      <ui-pagination-item>1</ui-pagination-item>
      <ui-pagination-item>1</ui-pagination-item>
    </ui-pagination>
  `,
})

export const Default = Template.bind({})
Default.args = {
  size: 60
}
