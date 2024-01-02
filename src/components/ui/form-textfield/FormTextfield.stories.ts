import FormTextfield from './FormTextfield.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** A text input field is a space where users can type and enter short pieces of information, such as names, addresses, or other brief text. */
const meta: Meta<typeof FormTextfield> = {
	title: 'Ui/Form/FormTextfield',
	component: FormTextfield,
	tags: ['autodocs'],
	args: {
		label: 'Label',
		float: false,
		disabled: false,
		size: 'md',
		invalidFeedback: '',
		state: undefined
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		state: {
			control: 'radio',
			options: [true, false, 'undefined'],
			defaultValue: 'undefined',
			description: 'Determines input state: `true` for valid, `false` for invalid, `undefined` for neutral'
		},
		invalidFeedback: {
			control: 'text'
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
		leadingIcon: 'search'
	}
}

export const TrailingIcon: Story = {
	args: {
		trailingIcon: 'search'
	}
}

export const LabelInfo: Story = {
	args: {
		labelInfo: 'Label Info'
	}
}

export const InvalidFeedback: Story = {
	args: {
		float: true,
		label: 'My Label',
		state: false,
		invalidFeedback: 'Campo inválido'
	}
}

export const Mask: Story = {
	args: {
		mask: ['(##) ####-####', '(##) #####-####']
	}
}
