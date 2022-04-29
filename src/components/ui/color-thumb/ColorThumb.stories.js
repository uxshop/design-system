import ColorThumb from './ColorThumb.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/ColorThumb',
	component: ColorThumb,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	args: {
		type: 'ColorThumb'
	},
	argTypes: {
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { ColorThumb },
	setup() {
		return { args }
	},
	template: `
		<ColorThumb v-bind="args" />
	`
})

export const Default = Template.bind({})
Default.args = {
	hexadecimal: 'red',
}
 