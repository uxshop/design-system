export type ToastVariant = 'default' | 'highlight' | 'success' | 'warning' | 'critical';

export interface ToastProps {
  className?: string;
  closeable?: boolean;
  duration?: number;
  id?: string;
  message?: string;
  variant?: ToastVariant;
}

export interface StateInterface {
  option: Record<string, string>;
  timer: ReturnType<typeof setTimeout> | null;
  showing: boolean;
}
