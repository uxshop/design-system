import type { Meta, StoryObj } from '@storybook/vue3'

import Icon from './Icon.vue'

const meta = {
	title: 'Ui/Icon',
	component: Icon,
	tags: ['autodocs'],
	args: {
		name: 'house',
		size: 30,
		type: 'rounded',
		filled: false
	},
	argTypes: {
		size: {
			control: 'number',
			description: 'number | string'
		},
		type: {
			control: 'select',
			options: ['outlined', 'rounded', 'sharp']
		}
	}
} satisfies Meta<typeof Icon>

type Story = StoryObj<typeof meta>

export default meta

export const Outlined: Story = {
	args: {
		type: 'outlined'
	}
}

export const Filled: Story = {
	args: {
		filled: true
	}
}
