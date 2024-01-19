import type { Meta, StoryObj } from '@storybook/vue3'

import Timeline from './Timeline.vue'

const meta = {
	title: 'Ui/Timeline',
	component: Timeline,
	tags: ['autodocs'],
	args: {
		inputMessage: undefined
	},
	argTypes: {}
} satisfies Meta<typeof Timeline>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	render: () => ({
		components: { Timeline },
		setup() {
			const timeline = [
				{
					title: 'Timeline title',
					text: 'Timeline text',
					date: '1/01/2001'
				},
				{
					title: 'Timeline title',
					text: 'Timeline text',
					date: '1/01/2001'
				},
				{
					title: 'Timeline title',
					text: 'Timeline text',
					date: '1/01/2001'
				}
			]
			return { timeline }
		},
		template: `
    <div>
      <Timeline v-model="timeline" />
    </div>`
	})
}
