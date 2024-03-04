import type { Meta, StoryObj } from '@storybook/vue3'

import Skeleton from './Skeleton.vue'

const meta = {
	title: 'Ui/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	args: {
		width: '100%',
		height: '10px'
	}
} satisfies Meta<typeof Skeleton>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}
