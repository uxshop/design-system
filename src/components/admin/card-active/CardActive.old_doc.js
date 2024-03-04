import { ref } from 'vue'
import CardActive from './CardActive.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/CardActive',
	component: CardActive,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { CardActive },
	setup() {
		const model = ref({ active: true })
		const toggleActive = () => {
			console.log('@Event: toggleActive', model.value)
		}
		return { args, model, toggleActive }
	},
	template: `
    <CardActive v-bind="args" v-model=model @toggleActive=toggleActive />
		<pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {}
