import type { Meta, StoryObj } from '@storybook/vue3'

import ColorThumb from './ColorThumb.vue'

const meta = {
	title: 'Ui/Color Thumb',
	component: ColorThumb,
	tags: ['autodocs'],
	args: {
		hexadecimal: '#ff0000',
		size: 'md',
		hexadecimalSecondary: undefined,
		image: undefined,
		width: undefined
	},
	argTypes: {
		hexadecimal: {
			control: 'color'
		},
		hexadecimalSecondary: {
			control: 'color'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		width: {
			control: 'number',
			description: 'number | string'
		}
	}
} satisfies Meta<typeof ColorThumb>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {
		size: 'md'
	}
}

export const Image: Story = {
	args: {
		hexadecimal: undefined,
		hexadecimalSecondary: undefined,
		image: 'https://picsum.photos/200',
		size: 'md'
	}
}
