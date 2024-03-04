import { ref } from 'vue'
import FormRange from './FormRange.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** A range slider is a input field to to choose a number within a set range of minimum and maximum values. */
const meta: Meta<typeof FormRange> = {
	title: 'Ui/Form/FormRange',
	component: FormRange,
	tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => ({
		components: { FormRange },
		setup() {
			const modelValue = ref(20)
			return { modelValue }
		},
		template: `<FormRange v-model="modelValue" />`
	})
}
export const Disabled: Story = {
	args: {
		disabled: true
	}
}
