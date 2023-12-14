import type { Meta, StoryObj } from '@storybook/vue3'

import RatingStar from './RatingStar.vue'

const meta = {
	title: 'Ui/Rating Star',
	component: RatingStar,
	tags: ['autodocs'],
	args: {
		modelValue: 4,
		size: 30
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
