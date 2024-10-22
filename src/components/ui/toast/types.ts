import type { Variant } from '../../../types';

export interface ToastProps {
  className?: string;
  closeable?: boolean;
  duration?: number;
  id?: string;
  message?: string;
  variant?: Variant | 'default';
}

export interface StateInterface {
  option: Record<string, string>;
  timer: ReturnType<typeof setTimeout> | null;
  showing: boolean;
}
