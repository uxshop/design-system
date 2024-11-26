export type AlertVariant = 'success' | 'danger' | 'default' | 'warning' | 'highlight';

export interface AlertProps {
  title?: string;
  variant?: AlertVariant;
  icon?: string | null;
  dismissible?: boolean;
  show?: boolean;
  center?: boolean;
  label?: string;
}
