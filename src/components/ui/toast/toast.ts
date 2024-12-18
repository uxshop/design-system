import { render, createVNode } from 'vue';
import ToastComponent from './Toast.vue';

const globalConfig = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  transition: 'slide-down',
  duration: 3000,
  message: '',
  closeable: false,
};

let seed = 1;

const open = (text: string, config: any = {}) => {
  let toastWrapper = null;
  let toastVM = null;
  const id = 'ui-toast-' + seed++;
  toastWrapper = document.createElement('div');
  toastWrapper.id = id;
  toastVM = createVNode(
    ToastComponent,
    {
      ...globalConfig,
      ...config,
      message: text,
      id,
      variant: config.type,
    },
    null
  );
  render(toastVM, toastWrapper);
  document.body.appendChild(toastWrapper);
};

export const $toast = {
  open: open,
  success(text: string) {
    open(text, { type: 'success' });
  },
  danger(text: string) {
    open(text, { type: 'critical' });
  },
};
