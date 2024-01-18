import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../button/Button.vue'

import Modal from './Modal.vue'

const meta = {
	title: 'Ui/Modal',
	component: Modal,
	tags: ['autodocs'],
	args: {
		modelValue: true,
		centered: true,
		hideHeader: false,
		hideFooter: false,
		inner: false,
		noCloseOnBackdrop: false,
		scrollable: true,
		show: true,
		size: 'sm',
		title: 'Modal title',
		class: undefined,
		id: undefined,
		params: undefined,
		width: undefined
	}
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	// render: (args) => ({
	// 	components: { Modal, Button },
	// 	setup() {
	// 		const modelValue = ref(args.modelValue)
	// 		const onUpdateModelValue = (value: boolean) => {
	// 			modelValue.value = value
	// 		}
	// 		return { args, modelValue, onUpdateModelValue }
	// 	},
	// 	template: `
	//   <div>
	//     <Button variant="primary" @click="modelValue = true">Open modal</Button>
	//     <Modal> v-bind="args" modelValue="modelValue" @update:modelValue="onUpdateModelValue"/>
	//   </div>`
	// })
}
