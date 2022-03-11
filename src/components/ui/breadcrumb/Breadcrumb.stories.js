import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Breadcrumb',
	component: Breadcrumb,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	argTypes: {
		// backgroundColor: { control: 'color' },
		onClick: {}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Breadcrumb, BreadcrumbItem },
	setup() {
		return { args }
	},
	template: `
    <-breadcrumb v-bind="args">
      <BreadcrumbItem :to="{}">Item</BreadcrumbItem>
      <BreadcrumbItem :to="{}">Item2</BreadcrumbItem>
      <BreadcrumbItem :to="{}">Item3</BreadcrumbItem>
    </-breadcrumb>
  `
})

export const Default = Template.bind({})
Default.args = {}

Default.decorators = [vueRouter()]
