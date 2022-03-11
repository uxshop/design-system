import Toast from './Toast.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Toast',
	component: Toast,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Toast },
	setup() {
		return { args }
	},
	template: `
    <Toast v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	message: 'Hello World'
}

export const Success = Template.bind({})
Success.args = {
	message: 'Hello World',
	variant: 'success'
}

export const Danger = Template.bind({})
Danger.args = {
	message: 'Hello World',
	variant: 'danger'
}
