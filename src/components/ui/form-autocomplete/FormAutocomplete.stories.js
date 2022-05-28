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
		const model = ref(1)
		return { args, model }
	},
	template: `
    <FormAutocomplete v-bind="args" v-model="model" />
    <pre>{{ model }}</pre>
  `
})

export const Default = Template.bind({})
Default.args = {
	choices: [
		{ value: 1, label: 'Hello' },
		{ value: 2, label: 'World' }
	]
}

const Template2 = (args) => ({
	components: { FormAutocomplete },
	setup() {
		const model = ref(2)
		const choices = ref([])
		setTimeout(() => {
			choices.value = [
				{ value: 1, label: 'DIY', customProperties: { url: 'https://diy.org' } },
				{ value: 2, label: 'Google', customProperties: { url: 'http://google.com' } },
				{ value: 3, label: 'Yahoo', customProperties: { url: 'http://yahoo.com' } }
			]
		}, 1000)

		return { model, args, choices }
	},
	template: `
    <FormAutocomplete v-bind=args  :choices=choices  v-model=model />
    <pre>{{ model }}</pre>
  `
})

export const RenderTemplate = Template2.bind({})
RenderTemplate.args = {
	placeholder: 'Selecione Custom',
	templates: {
		choice: function (data) {
			return `
				<div>
					<span>&bigstar;</span>
					<span class="title">
						${data.label}
					</span>
					<small class="d-block">
						${data.customProperties.url}
					</small>
				</div>
			`
		},
		item: function (data) {
			return `<div>${data.title}</div>`
		}
	},
	config: {
		searchField: 'title'
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
