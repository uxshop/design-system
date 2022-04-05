import SkeletonTable from './SkeletonTable.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/SkeletonTable',
	component: SkeletonTable,
	argTypes: {},
	args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { SkeletonTable },
	setup() {
		return { args }
	},
	template: `
    <SkeletonTable v-bind="args" /> 
  `
})

export const Default = Template.bind({})
Default.args = {}

export const WithAction = Template.bind({})
WithAction.args = {
	noBorder: true,
	withAction: 2
}
