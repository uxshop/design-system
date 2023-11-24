import type { Meta, StoryObj } from '@storybook/vue3'

import Badge from './Badge.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
	title: 'Example/Badge',
	component: Badge,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		label: 'Badge label',
		variant: 'primary',
		size: 'lg',
		pill: false
	},
	argTypes: {
		label: {
			description: 'string | number'
		},
		variant: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'warning', 'danger', 'dark', 'success']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		}
	}
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
	args: {}
}

export const Primary: Story = {
	args: {
		variant: 'primary'
	}
}

export const Secondary: Story = {
	args: {
		variant: 'secondary'
	}
}

export const Warning: Story = {
	args: {
		variant: 'warning'
	}
}

export const Danger: Story = {
	args: {
		variant: 'danger'
	}
}

export const Dark: Story = {
	args: {
		variant: 'dark'
	}
}

export const Success: Story = {
	args: {
		variant: 'success'
	}
}
