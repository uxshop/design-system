import type { Meta, StoryObj } from '@storybook/vue3'

import Tag from './Tag.vue'

const meta = {
	title: 'Example/Tag',
	component: Tag,
	tags: ['autodocs'],
	args: {
		label: 'Tag label'
	}
} satisfies Meta<typeof Tag>

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

export const Danger: Story = {
	args: {
		variant: 'danger'
	}
}
