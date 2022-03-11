import FormRange from './FormRange.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormRange',
	component: FormRange,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormRange },
	setup() {
		const model = ref(0.5)
		return { args, model }
	},
	template: `
    <FormRange v-bind="args" v-model="model"></FormRange>
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Range slider',
	step: 0.1,
	max: 1,
	min: 0
}
