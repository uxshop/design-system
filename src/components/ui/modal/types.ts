import type { Size } from '../../../types';

export interface ModalProps {
  caption?: string;
  centered?: boolean;
  class?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  id?: string;
  inner?: boolean;
  modelValue?: boolean;
  noCloseOnBackdrop?: boolean;
  params?: Record<string, unknown>;
  hideClose?: boolean;
  scrollable?: boolean;
  show?: boolean;
  size?: Size;
  title?: string;
  width?: string;
}
