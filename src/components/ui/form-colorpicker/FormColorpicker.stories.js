import FormColorpicker from './FormColorpicker.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormColorpicker',
	component: FormColorpicker,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormColorpicker },
	setup() {
		const model = ref('#cccccc')
		setTimeout(() => {
			model.value = '#000000'
		}, 1000)
		return { args, model }
	},
	template: `
    <FormColorpicker v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {}
