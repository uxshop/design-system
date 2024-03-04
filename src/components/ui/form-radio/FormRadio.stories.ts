import FormRadio from './FormRadio.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** Use radio buttons when you need to make a single selection from a list of options. */
const meta: Meta<typeof FormRadio> = {
	title: 'Ui/Form/FormRadio',
	component: FormRadio,
	tags: ['autodocs'],
	args: {
		disabled: false,
		label: 'Label'
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}
