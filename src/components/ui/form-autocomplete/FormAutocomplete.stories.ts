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
		options: [
			{ value: 1, label: 'Hello' },
			{ value: 2, label: 'World' }
		]
	},
	argTypes: {}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
