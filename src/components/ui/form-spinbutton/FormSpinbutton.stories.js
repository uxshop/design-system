import FormSpinbutton from './FormSpinbutton.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormSpinbutton',
	component: FormSpinbutton,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormSpinbutton },
	setup() {
		const model = ref(1)
		return { args, model }
	},
	template: `
    <FormSpinbutton v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const MinMax = Template.bind({})
MinMax.args = {
	min: 0,
	max: 5
}
