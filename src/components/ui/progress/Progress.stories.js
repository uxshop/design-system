import Progress from './Progress.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Progress',
	component: Progress,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Progress },
	setup() {
		return { args }
	},
	template: `
    <Progress v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	value: '70',
	max: '100'
}
