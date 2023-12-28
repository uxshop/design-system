import FormSelect from './FormSelect.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** A select allows users to choose one option from a list of values. */
const meta: Meta<typeof FormSelect> = {
	title: 'Ui/FormSelect',
	component: FormSelect,
	tags: ['autodocs'],
	args: {
		label: 'Label',
		float: false,
		disabled: false,
		state: false,
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

export const leadingIcon: Story = {
	args: {
		leadingIcon: 'check'
	}
}

export const trailingIcon: Story = {
	args: {
		trailingIcon: 'check'
	}
}

export const LabelInfo: Story = {
	args: {
		labelInfo: 'Label Info'
	}
}
