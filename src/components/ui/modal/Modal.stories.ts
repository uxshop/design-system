import type { Meta, StoryObj } from '@storybook/vue3'

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
		hideClose: false,
		show: true,
		size: 'md',
		title: 'Modal title',
		class: undefined,
		id: undefined,
		params: undefined,
		width: undefined
	}
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
