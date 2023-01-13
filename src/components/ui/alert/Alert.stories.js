import Alert from './Alert.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Alert',
	component: Alert,
	argTypes: {},
	args: {
		title: 'My Title',
		show: true
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Alert },
	setup() {
		return { args }
	},
	template: `
    <Alert v-bind="args" dismissible>
      #default slot
    </Alert>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const success = Template.bind({})
success.args = {
	variant: 'success'
}

export const danger = Template.bind({})
danger.args = {
	variant: 'danger'
}

export const warning = Template.bind({})
warning.args = {
	variant: 'warning'
}

export const info = Template.bind({})
info.args = {
	variant: 'info'
}

export const dismissible = Template.bind({})
dismissible.args = {
	dismissible: true
}
