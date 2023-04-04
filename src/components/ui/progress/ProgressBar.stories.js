import ProgressBar from './ProgressBar.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/ProgressBar',
	component: ProgressBar,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { ProgressBar },
	setup() {
		return { args }
	},
	template: `
    <ProgressBar v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	value: '70',
	max: '100'
}
