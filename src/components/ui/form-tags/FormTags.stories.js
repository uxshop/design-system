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
		const model = ref(null)
		setTimeout(() => {
			model.value = ['1', '2']
		}, 1000)
		return { args, model }
	},
	template: `
    <FormTags v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

const data = []
for (let index = 1; index < 20; index++) {
	data.push({
		id: index,
		text: `Valor ${index}`
	})
}

export const Default = Template.bind({})
Default.args = {
	config: {
		data: data
	}
}
