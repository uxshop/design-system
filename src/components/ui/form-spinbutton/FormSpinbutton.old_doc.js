import FormSpinbutton from './FormSpinbutton.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormSpinbutton',
	component: FormSpinbutton,
	argTypes: {
		size: {
			options: ['md', 'sm', 'lg'],
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
	components: { FormSpinbutton },
	setup() {
		const model = ref(1)
		const disabled = ref(false)
		return { args, model, disabled }
	},
	template: `
    <FormSpinbutton v-bind="args" v-model="model" :disabled=disabled />
    <br />
		<button @click="disabled=!disabled">disabled</button>
		<pre>modelValue: {{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const MinMax = Template.bind({})
MinMax.args = {
	min: 0,
	max: 5
}

export const MinMaxEditable = Template.bind({})
MinMaxEditable.args = {
	inputable: true,
	placeholder: 0,
	min: 0,
	max: 5
}
