import { filter, find } from 'lodash'
import BrowserSelect from './BrowserSelect.vue'

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
	template: `
    <BrowserSelect v-bind="args">
      My BrowserSelect 
    </BrowserSelect>
  `
})

const service = {
	get(params) {
		const res = {
			data: [
				{ id: 1, name: 'Hello World 1' },
				{ id: 2, name: 'Hello World 2' },
				{ id: 3, name: 'Hello World 3' },
				{ id: 4, name: 'Hello World 4' },
				{ id: 5, name: 'Hello World 5' },
				{ id: 6, name: 'Hello World 6' },
				{ id: 7, name: 'Hello World 7' },
				{ id: 8, name: 'Hello World 8' }
			],
			links: {
				first: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
				last: 'http://localhost/dooca/apiv1/public/customers/groups?_=1649029751750&page=1',
				prev: null,
				next: null
			}
		}

		if (params.ids) {
			const ids = params.ids.split(',')
			res.data = filter(res.data, function (o) {
				return ids.indexOf(String(o.id)) !== -1
			})
		}

		return res
	}
}

export const Default = Template.bind({})
Default.args = {
	modelValue: [1, 3],
	service: service
}
