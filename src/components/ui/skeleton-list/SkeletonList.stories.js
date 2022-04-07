import SkeletonList from './SkeletonList.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/SkeletonList',
	component: SkeletonList,
	argTypes: {},
	args: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { SkeletonList },
	setup() {
		return { args }
	},
	template: `
    <SkeletonList v-bind="args" /> 
  `
})

export const Default = Template.bind({})
Default.args = {}
