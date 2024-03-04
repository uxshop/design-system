import type { Meta, StoryObj } from '@storybook/vue3'

import RatingStar from './RatingStar.vue'

/** Use rating stars in tables or cards to determine the relevance of objects or sort customer feedbacks. */
const meta = {
	title: 'Ui/Rating Star',
	component: RatingStar,
	tags: ['autodocs'],
	args: {
		modelValue: 4
	},
	argTypes: {
		size: {
			control: 'number'
		}
	}
} satisfies Meta<typeof RatingStar>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}
