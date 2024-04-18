import type { Meta, StoryObj } from '@storybook/vue3'
import SidebarHeader from './SidebarHeader.vue'

const meta = {
	title: 'Admin/SidebarHeader',
	component: SidebarHeader,
	tags: ['autodocs'],
	args: {
		logoImage: './logo.svg',
		actionsConfig: {
			notification: { show: true, nameClass: 'class-name' },
			quickSearch: { show: true }
		}
	},
	argTypes: {}
} satisfies Meta<typeof SidebarHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { SidebarHeader },
		setup() {
			return { args }
		},
		template: `
      <div style="width: 350px">
        <SidebarHeader
          v-bind="args"
        />
      </div>
    `
	})
}
