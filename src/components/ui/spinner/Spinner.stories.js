import Spinner from './Spinner.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Spinner',
	component: Spinner,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Spinner },
	setup() {
		return { args }
	},
	template: `
    <Spinner v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	border: 1
}
