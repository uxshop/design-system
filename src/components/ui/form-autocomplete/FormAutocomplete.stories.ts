import FormAutocomplete from './FormAutocomplete.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Autocomplete is like a smart text box that helps you find things faster. It suggests options, so you can quickly pick what you want from a big list. */
const meta: Meta<typeof FormAutocomplete> = {
	title: 'Ui/Form/FormAutocomplete',
	component: FormAutocomplete,
	tags: ['autodocs'],
	args: {
		placeholder: 'Placeholder',
		label: 'Label',
		config: {
			load: async function (query: any, callback: any) {
				console.log('🚀 ~ file: FormAutocomplete.stories.ts:14 ~ query:', query)
				var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(query)
				const res = await fetch(url)
				const json = await res.json()
				callback(json.items)
			}
		}
	},
	argTypes: {}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
