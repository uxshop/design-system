import BrowserSelectModal from './BrowserSelectModal.vue'
import { service } from './__mocks__/BrowserSelect'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/BrowserSelectModal',
	component: BrowserSelectModal,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { BrowserSelectModal },
	setup() {
		return { args }
	},
	template: `
    <BrowserSelectModal v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	type: 'brand',
	title: 'Marcas',
	service: service
}

export const Category = Template.bind({})
Category.args = {
	type: 'category',
	title: 'Categorias',
	service: service
}
