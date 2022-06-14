import FormTags from './FormTags.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormTags',
	component: FormTags,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormTags },
	setup() {
		const model = ref()
		setTimeout(() => {
			model.value = 'teste, teste2, teste3'
		}, 2000)
		return { args, model }
	},
	template: `
    <FormTags v-bind="args"  v-model="model"  />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const Selectable = Template.bind({})
Selectable.args = {}
