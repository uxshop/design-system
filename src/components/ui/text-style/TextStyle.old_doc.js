import TextStyle from './TextStyle.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/TextStyle',
	component: TextStyle,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { TextStyle },
	setup() {
		return { args }
	},
	template: `
		<TextStyle v-bind="args">Hello World!</TextStyle>
  `
})

export const Default = Template.bind({})
Default.args = {}
