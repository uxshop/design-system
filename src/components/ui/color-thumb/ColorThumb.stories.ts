import type { Meta, StoryObj } from '@storybook/vue3'

import ColorThumb from './ColorThumb.vue'

const meta = {
	title: 'Example/ColorThumb',
	component: ColorThumb,
	tags: ['autodocs'],
	args: {
		hexadecimal: '#000000',
		hexadecimalSecondary: '#ffffff'
	},
	argTypes: {
		hexadecimal: {
			control: 'color'
		},
		hexadecimalSecondary: {
			control: 'color'
		}
	}
} satisfies Meta<typeof ColorThumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {}
}
