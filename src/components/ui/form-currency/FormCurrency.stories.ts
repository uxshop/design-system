import FormCurrency from './FormCurrency.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** A currency field is an enhanced input field that only allows users to enter an amount of money. */
const meta: Meta<typeof FormCurrency> = {
	title: 'Ui/Form/FormCurrency',
	component: FormCurrency,
	tags: ['autodocs'],
	args: {
		state: undefined,
		invalidFeedback: '',
		float: false,
		loading: false,
		disabled: false,
		size: 'md',
		label: 'Label'
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		invalidFeedback: {
			control: 'text'
		},
		state: {
			control: 'radio',
			options: [true, false, 'undefined'],
			description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral'
		},
		step: {
			control: 'number'
		},
		min: {
			control: 'number'
		},
		max: {
			control: 'number'
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

export const Disabled: Story = {}

export const LeadingIcon: Story = {
	args: {
		leadingIcon: 'paid'
	}
}

export const TrailingIcon: Story = {
	args: {
		trailingIcon: 'paid'
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

export const MinAndMax: Story = {
	args: {
		min: 10,
		max: 100
	}
}
