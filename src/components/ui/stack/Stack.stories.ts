import type { Meta, StoryObj } from '@storybook/vue3'

import Stack from './Stack.vue'

const meta = {
	title: 'Ui/Stack',
	component: Stack,
	tags: ['autodocs'],
	args: {
		alignment: 'start',
		columns: undefined,
		distribution: 'center',
		horizontal: false,
		spacing: 'md',
		vertical: true,
		wrap: false
	},
	argTypes: {
		alignment: {
			control: 'select',
			options: ['start', 'center', 'end', 'fill']
		},
		columns: {
			description: 'string | number'
		},
		distribution: {
			control: 'select',
			options: ['center', 'right', 'around', 'evenly', 'between', 'default']
		}
	}
} satisfies Meta<typeof Stack>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	render: (args) => ({
		components: { Stack },
		setup() {
			return { args }
		},
		template: `
      <Stack v-bind="args">
        <span>item 1</span>
        <span>item 2</span>
        <span>item 3</span>
      </Stack>
    `
	})
}
