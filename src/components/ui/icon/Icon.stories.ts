import type { Meta, StoryObj } from '@storybook/vue3'

import Icon from './Icon.vue'

const meta = {
	title: 'Ui/Icon',
	component: Icon,
	tags: ['autodocs'],
	args: {
		name: 'house'
	},
	argTypes: {
		size: {
			control: 'number',
			description: 'number | string'
		},
		filled: {
			control: 'boolean'
		}
	}
} satisfies Meta<typeof Icon>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {}

export const Filled: Story = {
	args: {
		filled: true
	}
}

export const DsIcons: Story = {
	args: {
		size: 16,
		name: 'ds-amazon'
	}
}
