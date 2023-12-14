import type { Meta, StoryObj } from '@storybook/vue3'

import Tag from './Tag.vue'

const meta = {
	title: 'Ui/Tag',
	component: Tag,
	tags: ['autodocs'],
	args: {
		label: 'Tag label',
		variant: 'default'
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'highlight', 'warning', 'success', 'critical']
		}
	}
} satisfies Meta<typeof Tag>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {
		variant: 'default'
	}
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
