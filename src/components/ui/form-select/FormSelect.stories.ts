import FormSelect from './FormSelect.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** A select allows users to choose one option from a list of values. */
const meta: Meta<typeof FormSelect> = {
	title: 'Ui/Form/FormSelect',
	component: FormSelect,
	tags: ['autodocs'],
	args: {
		state: undefined,
		invalidFeedback: '',
		label: 'Label',
		float: false,
		disabled: false,
		loading: false,
		size: 'md',
		value: '',
		options: [
			{
				label: 'placeholder',
				value: '',
				disabled: true
			},
			{
				label: 'Option 1',
				value: 1
			},
			{
				label: 'Option 2',
				value: 2
			}
		]
	},
	argTypes: {
		state: {
			control: 'radio',
			options: [true, false, 'undefined'],
			description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Float: Story = {
	args: {
		float: true
	}
}

export const Loading: Story = {
	args: {
		loading: true
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const LeadingIcon: Story = {
	args: {
		leadingIcon: 'check'
	}
}

export const TrailingIcon: Story = {
	args: {
		trailingIcon: 'check'
	}
}

export const LabelInfo: Story = {
	args: {
		labelInfo: 'Label Info'
	}
}

export const InvalidFeedback: Story = {
	args: {
		state: false,
		invalidFeedback: 'Campo inválido'
	}
}
