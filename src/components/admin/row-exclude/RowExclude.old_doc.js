import RowExclude from './RowExclude.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/RowExclude',
	component: RowExclude,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { RowExclude },
	setup() {
		const model = ref([])
		setTimeout(() => {
			model.value = [1]
		}, 2000)
		return { args, model }
	},
	template: `
    <RowExclude v-bind="args" v-model="model"/>
    <pre>{{model}}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	rows: [
		{ id: 1, name: 'Name 01' },
		{ id: 2, name: 'Name 02' },
		{ id: 3, name: 'Name 03' }
	]
}
