import type { Meta, StoryObj } from '@storybook/vue3'
import HomeBar from './HomeBar.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
	title: 'Admin/HomeBar',
	component: HomeBar,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		userName: 'Lucas Correa'
	}
} satisfies Meta<typeof HomeBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { userName: 'Lucas Correa' }
}
