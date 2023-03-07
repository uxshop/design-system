import FormTextField from './FormTextfield.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormTextfield',
	component: FormTextField,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormTextField },
	setup() {
		const model = ref()
		return { args, model }
	},
	template: `
    <div>
      <FormTextField v-bind="args" v-model="model" disabled />
      <pre>{{ model }}</pre>
    </div>
  `
})

const TemplateAfter = (args) => ({
	components: { FormTextField },
	setup() {
		const model = ref()
		return { args, model }
	},
	template: `
    <div>
      <FormTextField v-bind="args" v-model="model" >
        <template #after>
          <span style="padding: 0 10px">
            ANY
          </span>
        </template>
      </FormTextField>
      <pre>{{ model }}</pre>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
	label: 'Placeholder',
	placeholder: 'Placeholder',
	labelInfo: 'Teste'
}
export const Float = Template.bind({})
Float.args = {
	float: true,
	label: 'Placeholder',
	labelInfo: 'Teste'
}

export const leadingIcon = Template.bind({})
leadingIcon.args = {
	float: true,
	label: 'My Label',
	leadingIcon: 'search'
}

export const trailingIcon = Template.bind({})
trailingIcon.args = {
	float: true,
	label: 'My Label',
	trailingIcon: 'search'
}

export const loading = Template.bind({})
loading.args = {
	float: true,
	label: 'My Label',
	loading: true
}

export const invalidFeedback = Template.bind({})
invalidFeedback.args = {
	float: true,
	label: 'My Label',
	state: false,
	invalidFeedback: 'Campo inválido'
}

export const AfterTemplate = TemplateAfter.bind({})
AfterTemplate.args = {
	float: true,
	label: 'My Label'
}

export const mask = Template.bind({})
mask.args = {
	float: true,
	label: 'My Label',
	mask: '#####-###',
	trailingText: 'Hello'
}
