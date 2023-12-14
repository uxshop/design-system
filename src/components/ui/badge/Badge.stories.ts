import type { Meta, StoryObj } from '@storybook/vue3'

import Badge from './Badge.vue'

const meta = {
	title: 'Ui/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		label: 'Badge label',
		pill: false,
		size: 'md',
		variant: 'default'
	},
	argTypes: {
		label: {
			description: 'string | number'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		variant: {
			control: 'select',
			options: ['default', 'highlight', 'warning', 'success', 'critical']
		}
	}
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {
		size: 'sm'
	}
}

export const Highlight: Story = {
	args: {
		variant: 'highlight',
		pill: true,
		size: 'sm'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning',
		pill: true
	}
}

export const Success: Story = {
	args: {
		variant: 'success',
		size: 'lg'
	}
}

export const Critical: Story = {
	args: {
		variant: 'critical',
		pill: true,
		size: 'lg'
	}
}
