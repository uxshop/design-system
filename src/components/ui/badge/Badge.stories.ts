import type { Meta, StoryObj } from '@storybook/vue3'

import Badge from './Badge.vue'

const meta = {
	title: 'Example/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		label: 'Badge label',
		variant: 'primary',
		size: 'lg',
		pill: false
	},
	argTypes: {
		label: {
			description: 'string | number'
		},
		variant: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'warning', 'danger', 'dark', 'success']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		}
	}
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}

export const Primary: Story = {
	args: {
		variant: 'primary'
	}
}

export const Secondary: Story = {
	args: {
		variant: 'secondary'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning'
	}
}

export const Danger: Story = {
	args: {
		variant: 'danger'
	}
}

export const Dark: Story = {
	args: {
		variant: 'dark'
	}
}

export const Success: Story = {
	args: {
		variant: 'success'
	}
}
