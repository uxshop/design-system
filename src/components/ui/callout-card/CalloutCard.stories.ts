import type { Meta, StoryObj } from '@storybook/vue3'

import CalloutCard from './CalloutCard.vue'

const meta = {
	title: 'Example/CalloutCard',
	component: CalloutCard,
	tags: ['autodocs'],
	args: {
		title: 'Callout card title'
	}
} satisfies Meta<typeof CalloutCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}
