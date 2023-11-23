import FormDatepicker from './FormDatepicker.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormDatepicker',
	component: FormDatepicker,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormDatepicker },
	setup() {
		const model = ref()
		setTimeout(() => {
			model.value = '2021-01-01TO2021-02-01'
		}, 2000)
		return { args, model }
	},
	template: `
    <div>
      <FormDatepicker v-bind="args" v-model="model" />
      <pre>{{ model }}</pre>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
	placeholder: 'Date de nasc'
}

export const DateRange = Template.bind({})
DateRange.args = {
	placeholder: 'Date de nasc',
	range: true
}

export const Float = Template.bind({})
Float.args = {
	label: 'Date de nasc',
	float: true
}
