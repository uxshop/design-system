import { filter } from 'lodash-es'
import BrowserSelect from './BrowserSelect.vue'
import { service } from './__mocks__/BrowserSelect'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/BrowserSelect',
	component: BrowserSelect,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { BrowserSelect },
	setup() {
		return { args }
	},
	template: `<BrowserSelect v-bind="args" />`
})

const serviceFiltered = {
	async get(params) {
		const res = await service.get(params)

		if (params.ids) {
			const ids = params.ids.split(',')
			res.data = filter(res.data, function (o) {
				return ids.indexOf(String(o.id)) !== -1
			})
		}

		console.log(res)

		return res
	}
}

export const Default = Template.bind({})
Default.args = {
	modelValue: [1, 3],
	service: serviceFiltered
}
