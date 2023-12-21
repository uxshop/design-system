import Dialog from './Dialog.vue'
import Button from '../button/Button.vue'
import DialogService, { type OpenDialogConfig } from './index'
import type { StoryObj, Meta } from '@storybook/vue3'

interface MergedType extends Meta<typeof Dialog>, OpenDialogConfig {}

const meta: MergedType = {
	title: 'Ui/Dialog',
	component: Dialog,
	tags: ['autodocs'],
	args: {
		title: 'Dialog Title',
		message: 'Dialog message here...',
		closeOnBackdrop: true,
		cancelLabel: 'Cancel',
		destructIcon: '',
		destructLabel: 'Deletar',
		destructVariant: 'danger',
		hideFooter: false,
		hideCancel: false,
		opened: true,
		promptType: 'text'
	},
	argTypes: {
		destructVariant: {
			control: {
				type: 'select',
				options: ['success', 'danger', 'primary']
			}
		}
	}
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => ({
		components: { Dialog, Button },
		setup() {
			const onClick = () => {
				DialogService.open(args)
			}
			return { args, onClick }
		},
		template: `
    <Button variant="primary" @click="onClick" label="open" />
    `
	})
}

export const DefaultPrompt: Story = {
	args: {
		type: 'prompt',
		promptLabel: 'Prompt Label',
		promptPlaceholder: 'Placeholder here...',
		hideFooter: true
	},
	render: Default.render
}

export const PromptWithFooter: Story = {
	args: {
		type: 'prompt',
		promptLabel: 'Prompt Label',
		promptPlaceholder: 'Placeholder here...'
	},
	render: Default.render
}
