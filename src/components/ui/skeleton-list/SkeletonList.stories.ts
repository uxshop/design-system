import type { Meta, StoryObj } from '@storybook/vue3'

import SkeletonList from './SkeletonList.vue'

const meta = {
	title: 'Ui/Skeleton/List',
	component: SkeletonList,
	tags: ['autodocs'],
	args: {
		cols: 2,
		rows: 3
	},
	argTypes: {
		cols: {
			control: 'number',
			description: 'number | string'
		},
		rows: {
			control: 'number',
			description: 'number | string'
		}
	}
} satisfies Meta<typeof SkeletonList>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}
