import Seo from './Seo.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Seo',
	component: Seo,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Seo },
	setup() {
		const reg = ref({
			meta_title: 'teste',
			meta_description: ''
		})

		return { args, reg }
	},
	template: `
    <Seo v-bind="args" v-model="reg" />
  `
})

export const Default = Template.bind({})
Default.args = {
	domain: 'dooca.com.br',
	title: 'Titulo geral',
	gray: true
}
