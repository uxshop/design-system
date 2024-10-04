import type { Size } from '../../../types';

export interface BadgeProps {
  label?: string | number;
  pill?: boolean;
  size?: Size;
  noWrap?: boolean;
  variant?: 'highlight' | 'warning' | 'success' | 'critical' | 'default';
}
