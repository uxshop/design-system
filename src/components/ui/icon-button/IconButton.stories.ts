import IconButton from './IconButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof IconButton> = {
	title: 'Ui/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	args: {
		icon: 'close',
		type: 'outlined',
		disabled: false
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'danger', 'link', 'dark', 'plain']
		},
		disabled: {
			defaultValue: false,
			control: 'boolean'
		},
		fab: {
			defaultValue: false,
			control: 'boolean'
		},

		size: {
			defaultValue: 'md',
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		type: {
			defaultValue: 'outlined',
			control: 'select',
			options: ['outlined', 'rounded', 'sharp']
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { IconButton },
		setup() {
			return { args }
		},
		template: `<IconButton v-bind="args" />`
	})
}
