import type { Meta, StoryObj } from '@storybook/vue3'

import Divider from './Divider.vue'

const meta = {
	title: 'Ui/Divider',
	component: Divider,
	tags: ['autodocs'],
	args: {
		height: '2px',
		margin: undefined,
		transparent: false
	},
	argTypes: {
		height: {
			description: 'number + px'
		}
	}
} satisfies Meta<typeof Divider>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}

export const Margin: Story = {
	args: {
		margin: '30px'
	}
}

export const Transparent: Story = {
	args: {
		transparent: true
	}
}
