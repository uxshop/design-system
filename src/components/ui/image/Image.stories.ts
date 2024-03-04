import type { Meta, StoryObj } from '@storybook/vue3'

import Image from './Image.vue'

const meta = {
	title: 'Ui/Image',
	component: Image,
	tags: ['autodocs'],
	args: {
		rounded: false,
		src: 'https://picsum.photos/200',
		size: 75
	},
	argTypes: {
		size: {
			control: 'number',
			description: 'size | number'
		}
	}
} satisfies Meta<typeof Image>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: {}
}

export const Rounded: Story = {
	args: {
		rounded: true
	}
}
