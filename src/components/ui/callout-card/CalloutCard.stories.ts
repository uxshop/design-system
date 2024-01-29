import type { Meta, StoryObj } from '@storybook/vue3'

import CalloutCard from './CalloutCard.vue'

const meta = {
	title: 'Ui/Callout Card',
	component: CalloutCard,
	tags: ['autodocs'],
	args: {
		title: 'Callout card title',
		icon: 'house',
		primaryAction: undefined,
		justifyCardActions: undefined,
		bgColorIconPrimary: undefined
	}
} satisfies Meta<typeof CalloutCard>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	render: (args) => ({
		components: { CalloutCard },
		setup() {
			return { args }
		},
		template: `
      <CalloutCard v-bind="args">Callout card content</CalloutCard>
      `
	})
}
