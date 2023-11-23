import Skeleton from './Skeleton.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Skeleton',
	component: Skeleton,
	argTypes: {},
	args: {
		text: 'MB'
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Skeleton },
	setup() {
		return { args }
	},
	template: `
    <Skeleton v-bind="args" /> 
  `
})

export const Default = Template.bind({})
Default.args = {}
