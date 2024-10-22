export interface AlertProps {
  title?: string;
  variant?: 'success' | 'danger' | 'info' | 'warning';
  icon?: string;
  dismissible?: boolean;
  show?: boolean;
  center?: boolean;
  label?: string;
}
