export type AlertVariant = 'success' | 'danger' | 'info' | 'warning';

export interface AlertProps {
  title?: string;
  variant?: AlertVariant;
  icon?: string;
  dismissible?: boolean;
  show?: boolean;
  center?: boolean;
  label?: string;
}
