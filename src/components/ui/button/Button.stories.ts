import { computed } from 'vue'
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
			options: ['primary', 'secondary', 'success', 'danger', 'dark', 'light', 'plain', 'link']
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

export const Default: Story = {
	render: (args) => ({
		components: { Button },
		setup() {
			return { args }
		},
		template: `<Button v-bind="args" />`
	})
}

export const Primary: Story = {
	args: {
		variant: 'primary'
	},
	render: Default.render
}

export const Secondary: Story = {
	args: {
		variant: 'secondary'
	},
	render: Default.render
}

export const Success: Story = {
	args: {
		variant: 'success'
	},
	render: Default.render
}

export const Danger: Story = {
	args: {
		variant: 'danger'
	},
	render: Default.render
}

export const Dark: Story = {
	args: {
		variant: 'dark'
	},
	render: Default.render
}

export const Light: Story = {
	args: {
		variant: 'light'
	},
	render: Default.render
}

export const Plain: Story = {
	args: {
		variant: 'plain'
	},
	render: Default.render
}

export const Link: Story = {
	args: {
		variant: 'link',
		target: '_blank'
	},
	render: Default.render
}

export const Loading: Story = {
	args: {
		loading: true
	},
	render: Default.render
}

export const disabled: Story = {
	args: {
		disabled: true
	},
	render: Default.render
}

export const WithIcon: Story = {
	args: {
		trailingIcon: 'check'
	},
	render: Default.render
}
