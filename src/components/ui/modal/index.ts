import type { ComponentOptions } from 'vue'
import Modal from './Modal.vue'
import ModalBody from './ModalBody.vue'
import ModalFooter from './ModalFooter.vue'

export default {
	install(app: ComponentOptions) {
		app.component('Modal', Modal)
		app.component('ModalBody', ModalBody)
		app.component('ModalFooter', ModalFooter)
	}
}
