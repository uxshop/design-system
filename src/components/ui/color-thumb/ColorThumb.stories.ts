import type { Meta, StoryObj } from '@storybook/vue3'

import ColorThumb from './ColorThumb.vue'

const meta = {
	title: 'Ui/Color Thumb',
	component: ColorThumb,
	tags: ['autodocs'],
	args: {
		size: 'md'
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

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		hexadecimal: '#ff0000',
		size: 'sm'
	}
}

export const Color: Story = {
	args: {
		hexadecimal: '#000000',
		hexadecimalSecondary: '#ffffff'
	}
}

export const Image: Story = {
	args: {
		image: 'https://picsum.photos/100',
		size: 'lg'
	}
}
