import type { ComponentOptions } from 'vue'
import Modal from './Modal.vue'
import ModalBody from './ModalBody.vue'
import ModalFooter from './ModalFooter.vue'

export default {
	install(app: ComponentOptions, { prefix }: any) {
		app.component(`${prefix}Modal`, Modal)
		app.component(`${prefix}ModalBody`, ModalBody)
		app.component(`${prefix}ModalFooter`, ModalFooter)
	}
}
