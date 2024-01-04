import FormDatepicker from './FormDatepicker.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Data picker is used to select a single or a range of dates. */
const meta: Meta<typeof FormDatepicker> = {
	title: 'Ui/Form/FormDatepicker',
	component: FormDatepicker,
	tags: ['autodocs'],
	args: {
		state: undefined,
		invalidFeedback: '',
		size: 'md',
		placeholder: 'Placeholder',
		label: 'Label',
		range: false,
		noClear: false,
		modelValue: '01/01/2024'
	},
	argTypes: {
		state: {
			control: 'radio',
			options: [true, false, 'undefined'],
			description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral'
		},
		invalidFeedback: {
			control: 'text'
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

export const DateRange: Story = {
	args: {
		range: true
	}
}

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
