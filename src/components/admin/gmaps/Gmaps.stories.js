import Gmaps from './Gmaps.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/Gmaps',
	component: Gmaps,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Gmaps },
	setup() {
		const reg = ref()
		return { args, reg }
	},
	template: `
    <Gmaps v-bind="args" v-model="reg" />
  `
})

export const Default = Template.bind({})
Default.args = {
	zoom: 20,
	address: {
		zipcode: '93548520',
		street: 'Rua Caipos',
		number: 54,
		district: 'Jardim Maua',
		city: 'Novo Hamburgo'
	}
}
