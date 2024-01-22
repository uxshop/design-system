import { ref } from 'vue'
import FormTags from './FormTags.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

/** An input field that allows adding and removing tags. */
const meta: Meta<typeof FormTags> = {
	title: 'Ui/Form/FormTags',
	component: FormTags,
	tags: ['autodocs'],
	args: {
		label: 'Label'
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => ({
		components: { FormTags },
		setup() {
			const value = ref(['hello'])

			return {
				value
			}
		},
		template: `
      <FormTags
        v-model="value"
      />
    `
	})
}

export const Selectable: Story = {
	args: {
		create: false,
		options: [
			{
				label: 'Hello!',
				value: 'hello'
			},
      {
				label: 'World!',
				value: 'world'
			}
		]
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}
