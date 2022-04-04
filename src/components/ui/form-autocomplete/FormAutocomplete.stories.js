import FormAutocomplete from './FormAutocomplete.vue'
import { ref } from 'vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Forms/FormAutocomplete',
	component: FormAutocomplete,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { FormAutocomplete },
	setup() {
		const model = ref(null)
		return { args, model }
	},
	template: `
    <FormAutocomplete v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	config: {},
	options: [
		{ id: 1, text: 'Hello' },
		{ id: 2, text: 'World' }
	]
}

const Template2 = (args) => ({
	components: { FormAutocomplete },
	setup() {
		const model = ref(2)
		const options = ref([])

		setTimeout(() => {
			options.value = [
				{ id: 1, title: 'DIY', url: 'https://diy.org' },
				{ id: 2, title: 'Google', url: 'http://google.com' },
				{ id: 3, title: 'Yahoo', url: 'http://yahoo.com' }
			]
		}, 1000)

		return { options, model, args }
	},
	template: `
    <FormAutocomplete v-bind="args" :options="options" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const RenderTemplate = Template2.bind({})
RenderTemplate.args = {
	placeholder: 'Selecione Custom',

	config: {
		searchField: 'title',
		render: {
			option: function (data, escape) {
				return `
					<div>
						<span class="title">
							${data.title}
						</span>
						<small class="d-block">
							${escape(data.url)}
						</small>
					</div>
				`
			},
			item: function (data, escape) {
				return `<div>${escape(data.title)}</div>`
			}
		}
	}
}

export const RemoteData = Template.bind({})
RemoteData.args = {
	placeholder: 'Selecione Custom',
	config: {
		searchField: 'name',
		labelField: 'name',
		options: [],
		load: async function (query, callback) {
			var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(query)
			const res = await fetch(url)
			const json = await res.json()
			callback(json.items)
		},
		render: {
			option: function (data, escape) {
				return `
					<div>
						<span class="title">
							${data.name}
						</span>
						<small class="d-block">
							${escape(data.ssh_url)}
						</small>
					</div>
				`
			}
			// item: function (data, escape) {
			// 	return `<div>${escape(data.name)}</div>`
			// }
		}
	}
}
