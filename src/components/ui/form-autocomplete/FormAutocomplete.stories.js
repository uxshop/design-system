import FormAutocomplete from './FormAutocomplete.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormAutocomplete',
	component: FormAutocomplete,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormAutocomplete },
	setup() {
		const model = ref(null)
		return { args, model }
	},
	template: `
    <FormAutocomplete v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	config: {
		data: [
			{
				id: 1,
				text: 'Hello'
			},
			{
				id: 2,
				text: 'World'
			}
		]
	}
}
