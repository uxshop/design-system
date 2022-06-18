import { render, createVNode } from 'vue'
import DialogComponent from './Dialog.vue'

interface ConfigInterface {
	type?: 'danger' | 'prompt' | 'confirm'
	destructLabel?: string
	destructIcon?: string
	destructVariant?: string
	hideCancel?: boolean
	title?: string
	message?: string
	onCallback?(val: boolean): void
	onClose?(val: boolean): void
}

const globalConfig = {
	opened: true
}

let seed = 1

const open = (config: ConfigInterface = {}) => {
	let dialogWrapper = null
	let dialogVM = null
	const id = 'ui-dialog-' + seed++
	dialogWrapper = document.createElement('div')
	dialogWrapper.id = id
	dialogVM = createVNode(DialogComponent, {
		...globalConfig,
		...config,
		id
	})

	render(dialogVM, dialogWrapper)
	document.body.appendChild(dialogWrapper)
}
const Dialog = {
	open: open,
	delete(config: ConfigInterface = {}) {
		config.type = 'danger'
		config.destructLabel = 'Deletar'
		config.destructIcon = 'delete'
		config.destructVariant = 'danger'
		open(config)
	},
	prompt(config = {}) {
		config = {
			...{
				type: 'prompt',
				destructVariant: 'danger',
				destructLabel: 'Confirmar'
			},
			...config
		}
		open(config)
	},
	confirm(config: ConfigInterface = {}) {
		config.type = 'confirm'
		config.destructLabel = config.destructLabel || 'Confirmar'
		config.destructIcon = 'check'
		config.destructVariant = 'success'
		config.hideCancel = true
		open(config)
	}
}

export default Dialog
export { Dialog }
