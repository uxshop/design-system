import FormRadio from './FormRadio.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormRadio',
	component: FormRadio,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormRadio },
	setup() {
		return { args }
	},
	template: `
    <FormRadio v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Radio',
	value: '2'
}
