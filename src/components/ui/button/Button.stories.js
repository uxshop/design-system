import Button from './Button.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	args: {
		type: 'button'
	},
	argTypes: {
		variant: {
			options: ['primary', 'secondary', 'success', 'white', 'danger', 'dark', 'link'],
			control: { type: 'select' }
		},
		type: {
			options: ['button', 'submit'],
			control: { type: 'select' }
		}
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Button },
	setup() {
		return { args }
	},
	template: `
		<Button v-bind="args" />
		-
		<Button v-bind="args" variant=primary />
		-
		<Button v-bind="args" variant=success />
		-
		<Button v-bind="args" size=sm />
		-
		<Button v-bind="args" size=lg />
		-
		<Button v-bind="args" href="http://" />
	`
})

export const Default = Template.bind({})
Default.args = {
	label: 'Button',
	leadingIcon: 'check'
}

export const Link = Template.bind({})
Link.args = {
	variant: 'link',
	label: 'Button'
}

export const Spinner = Template.bind({})
Spinner.args = {
	variant: 'primary',
	label: 'Button',
	loading: true
}
