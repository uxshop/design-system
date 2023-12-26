import Button from './Button.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Buttons are used to initialize an action. The words on a button tell you what will happen when you click it. */
const meta: Meta<typeof Button> = {
	title: 'Ui/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		type: 'button',
		label: 'Button'
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		type: {
			options: ['button', 'submit'],
			control: { type: 'select' }
		},
		variant: {
			control: 'select',
			options: ['primary', 'success', 'danger', 'plain', 'link']
		},
		block: {
			control: 'boolean',
			defaultValue: false
		},
		spinnerBorder: {
			control: 'number',
			defaultValue: 2
		},
		loading: {
			control: 'boolean',
			defaultValue: false
		},
		outline: {
			control: 'boolean',
			defaultValue: false
		},
		disclosure: {
			control: 'boolean',
			defaultValue: false
		},
		target: {
			control: 'text',
			defaultValue: ''
		},
		disabled: {
			control: 'boolean',
			defaultValue: false
		}
	}
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Primary: Story = {
	args: {
		variant: 'primary'
	}
}

export const Success: Story = {
	args: {
		variant: 'success'
	}
}

export const Danger: Story = {
	args: {
		variant: 'danger'
	}
}

export const Plain: Story = {
	args: {
		variant: 'plain'
	}
}

export const Link: Story = {
	args: {
		variant: 'link',
		target: '_blank'
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

export const TrailingIcon: Story = {
	args: {
		trailingIcon: 'check'
	}
}

export const LeadingIcon: Story = {
	args: {
		leadingIcon: 'check'
	}
}
