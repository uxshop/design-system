import type { Meta, StoryObj } from '@storybook/vue3'
import Seo from './Seo.vue'

const meta = {
	title: 'Admin/Seo',
	component: Seo,
	tags: ['autodocs'],
	args: {
		modelValue: {
			slug: 'slug',
			meta_title: 'meta_title',
			meta_subtitle: 'meta_subtitle',
			meta_description: 'meta_description'
		},
		domain: 'bagy.com.br',
		viewOnly: false,
		writeOnly: false,
		isMetaTitle: false,
		gray: true
	}
} satisfies Meta<typeof Seo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WriteOnly: Story = {
	args: {
		writeOnly: true
	}
}
export const ViewOnly: Story = {
	args: {
		viewOnly: true
	}
}
