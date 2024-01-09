import type { Meta, StoryObj } from '@storybook/vue3'

import CustomScroll from './CustomScroll.vue'

const meta = {
	title: 'Ui/Custom Scroll',
	component: CustomScroll,
	tags: ['autodocs'],
	args: {},
	render: () => ({
		components: { CustomScroll },
		template: `
    <CustomScroll>
      <img src="https://picsum.photos/700/900"/>
    </CustomScroll>`
	}),
	argTypes: {}
} satisfies Meta<typeof CustomScroll>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {}
