import type { Meta, StoryObj } from '@storybook/vue3'

import Spinner from './Spinner.vue'

const meta = {
	title: 'Ui/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	args: {
		border: 3,
		size: 30,
		variant: 'default',
		color: undefined
	},
	argTypes: {
		border: { control: 'number', description: 'number | string' },
		size: { control: 'number', description: 'number | string' },
		variant: {
			control: 'select',
			options: ['default', 'highlight', 'warning', 'danger', 'success']
		},
		color: { control: 'color' }
	}
} satisfies Meta<typeof Spinner>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}

export const Highlight: Story = {
	args: {
		variant: 'highlight'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning'
	}
}

export const Success: Story = {
	args: {
		variant: 'success'
	}
}

export const Critical: Story = {
	args: {
		variant: 'critical'
	}
}

export const Color: Story = {
	args: {
		variant: undefined,
		color: '#000000'
	}
}
