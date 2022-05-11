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
		const model = ref('2')
		return { args, model }
	},
	template: `
    <FormTags v-bind="args"  v-model="model"  />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	// config: {
	// 	create: true,
	// 	choices: [
	// 		{ value: 1,label: 'Teste 01',  customProperties: {fixed: true}, selected: true },
	// 		{ value: 2,label: 'Teste 02' }
	// 	]
	// }
}

export const Selectable = Template.bind({})
Selectable.args = {
}
