import FormTextarea from './FormTextarea.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormTextarea',
	component: FormTextarea,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormTextarea },
	setup() {
		const model = ref()

		return { args, model }
	},
	template: `
    <div>
      <FormTextarea v-bind="args" v-model="model"  />
      <pre>{{ model }}</pre>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
	placeholder: 'Placeholder',
	label: 'Label'
}
export const Float = Template.bind({})
Float.args = {
	label: 'Label',
	float: true
}
