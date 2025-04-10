export type SpinnerVariant = 'default' | 'highlight' | 'success' | 'critical' | 'warning';

export interface SpinnerProps {
  border?: number | string;
  color?: string;
  size?: number | string;
  variant?: SpinnerVariant;
}
