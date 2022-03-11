import FormCheckbox from './FormCheckbox.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormCheckbox',
	component: FormCheckbox,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormCheckbox },
	setup() {
		const model = ref(['Mike'])
		return { args, model }
	},
	template: `
    <FormCheckbox v-bind="args" v-model="model" value="Mike" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Checkbox',
	value: 'Mike'
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
	label: 'Checkbox',
	indeterminate: true
}

export const Switch = Template.bind({})
Switch.args = {
	label: 'Switch',
	switch: true
}
