import type { Meta, StoryObj } from '@storybook/vue3'

import TextStyle from './TextStyle.vue'

const meta = {
	title: 'Ui/Text Style',
	component: TextStyle,
	tags: ['autodocs'],
	args: {
		label: 'Text style label',
		variant: 'default',
		block: undefined,
		tag: undefined
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'highlight', 'warning', 'success', 'critical', 'strong', 'muted']
		}
	}
} satisfies Meta<typeof TextStyle>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
	args: { variant: 'default' }
}

export const Highlight: Story = {
	args: { variant: 'highlight' }
}

export const Warning: Story = {
	args: { variant: 'warning' }
}

export const Success: Story = {
	args: { variant: 'success' }
}

export const Critical: Story = {
	args: { variant: 'critical' }
}

export const Strong: Story = {
	args: { variant: 'strong' }
}

export const Muted: Story = {
	args: { variant: 'muted' }
}
