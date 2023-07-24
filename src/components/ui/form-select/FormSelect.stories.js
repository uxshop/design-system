import FormSelect from './FormSelect.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormSelect',
	component: FormSelect,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormSelect },
	setup() {
		const model = ref(null)
		setTimeout(() => {
			// model.value = 2
		}, 1000)
		return { args, model }
	},
	template: `
    <FormSelect v-bind="args" v-model="model">
      <option :value=3>Teste</option>
    </FormSelect>
		<br />
    <FormSelect v-bind="args" v-model="model" size=sm>
      <option :value=3>Teste</option>
    </FormSelect>
		<br />
    <button @click="model=null">set null</button>
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Label',
	placeholder: 'Placeholder'
}
export const float = Template.bind({})
float.args = {
	placeholder: 'Placeholder',
	float: true,
	label: 'Label'
}
export const Options = Template.bind({})
Options.args = {
	placeholder: 'Placeholder',
	// float: true,
	label: 'Label',
	options: [
		{
			label: 'Valor 1',
			value: 1
		},
		{
			label: 'Valor 2',
			value: 2,
			disabled: true
		}
	]
}
export const ObjectOptions = Template.bind({})
ObjectOptions.args = {
	placeholder: 'Placeholder',
	label: 'Label',
	options: [
		{
			label: 'Valor 1',
			value: { name: '01' }
		},
		{
			label: 'Valor 2',
			value: { name: '02' }
		}
	]
}
