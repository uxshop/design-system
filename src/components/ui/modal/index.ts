import type { ComponentOptions } from 'vue';
import Modal from './Modal.vue';
import ModalBody from './ModalBody.vue';
import ModalFooter from './ModalFooter.vue';
import ModalItem from './ModalItem.vue';

export default {
  install(app: ComponentOptions, { prefix }: { prefix: string }) {
    app.component(`${prefix}Modal`, Modal);
    app.component(`${prefix}ModalBody`, ModalBody);
    app.component(`${prefix}ModalFooter`, ModalFooter);
    app.component(`${prefix}ModalItem`, ModalItem);
  },
};
