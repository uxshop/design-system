import type { Meta, StoryObj } from '@storybook/vue3'

import Card from './Card.vue'

const meta = {
	title: 'Example/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		title: 'Card title'
	}
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}
