import Stack from './Stack.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Stack',
	component: Stack,
	argTypes: {
		distribution: {
			control: { type: 'select' },
			options: ['default', 'left', 'center', 'right', 'around', 'evenly', 'between']
		},
		spacing: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'default', 'lg', 'xl']
		}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Stack },
	setup() {
		return { args }
	},
	template: `
    <Stack v-bind="args" >
		<div>bloco</div>
		<div>bloco</div>
		<div>bloco</div>
		<div>bloco</div>
		</Stack>
  `
})

export const Default = Template.bind({})
Default.args = {}
