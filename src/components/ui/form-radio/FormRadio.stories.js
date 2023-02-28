import { ref } from 'vue'
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
		const model = ref()
		return { args, model }
	},
	template: `
    <FormRadio v-bind="args" v-model="model" />
		<pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Radio',
	value: '2'
}
