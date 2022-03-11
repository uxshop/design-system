import Pagination from './Pagination.vue'
import PaginationItem from './PaginationItem.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Pagination',
	component: Pagination,
	argTypes: {},
	args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Pagination, PaginationItem },
	setup() {
		return { args }
	},
	template: `
    <Pagination v-bind="args">
      <PaginationItem disabled>1</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationItem>1</PaginationItem>
    </Pagination>
  `
})

export const Default = Template.bind({})
Default.args = {
	size: 60
}
