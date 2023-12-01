import type { Meta, StoryObj } from '@storybook/vue3'

import Badge from './Badge.vue'

const meta = {
	title: 'Example/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		label: 'Badge label',
		size: 'lg',
		pill: false
	},
	argTypes: {
		label: {
			description: 'string | number'
		},
		variant: {
			control: 'select',
			options: ['default', 'primary', 'warning', 'danger', 'success']
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
		variant: 'primary',
		size: 'sm'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning',
		size: 'sm',
		pill: true
	}
}

export const Success: Story = {
	args: {
		variant: 'success',
		size: 'lg'
	}
}

export const Danger: Story = {
	args: {
		variant: 'danger',
		size: 'lg',
		pill: true
	}
}
