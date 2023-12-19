import { ref } from 'vue'
import Aside from './Aside.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof Aside> = {
	title: 'Ui/Aside',
	component: Aside,
	tags: ['autodocs'],
	args: {
		modelValue: true,
		title: 'Aside title',
		subtitle: 'Aside subtitle'
	},
	argTypes: {
		modelValue: {
			control: 'boolean',
			defaultValue: false
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		inner: {
			control: 'boolean',
			defaultValue: false
		},
		scrollable: {
			control: 'boolean',
			defaultValue: false
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { Aside },
		setup() {
			const modelValue = ref(args.modelValue)
			const onUpdateModelValue = (value: boolean) => {
				modelValue.value = value
			}

			return { args, modelValue, onUpdateModelValue }
		},
		template: ` <Aside v-bind="args" v-model="modelValue" @update:modelValue="onUpdateModelValue"/>`
	})
}

export const Scrollable: Story = {
	args: {
		modelValue: true,
		title: 'Aside title',
		subtitle: 'Aside subtitle scrollable',
		scrollable: true
	},
	render: (args) => ({
		components: { Aside },
		setup() {
			const modelValue = ref(args.modelValue)
			const onUpdateModelValue = (value: boolean) => {
				modelValue.value = value
			}

			return { args, modelValue, onUpdateModelValue }
		},
		template: ` <Aside v-bind="args" v-model="modelValue" @update:modelValue="onUpdateModelValue"/>`
	})
}

export const WithButtons: Story = {
	args: {
		modelValue: true,
		title: 'Aside title',
		subtitle: 'Aside subtitle scrollable',
		primaryAction: {
			label: 'Primary action',
			onAction: () => {}
		},
		secondaryActions: [
			{
				label: 'Secondary actions',
				onAction: () => {}
			}
		]
	},
	render: (args) => ({
		components: { Aside },
		setup() {
			const modelValue = ref(args.modelValue)
			const onUpdateModelValue = (value: boolean) => {
				modelValue.value = value
			}

			return { args, modelValue, onUpdateModelValue }
		},
		template: ` <Aside v-bind="args" v-model="modelValue" @update:modelValue="onUpdateModelValue"/>`
	})
}
