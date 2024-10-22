import type { Size, Variant } from '../../../types';

export interface IconButtonProps {
  icon?: string;
  variant?: Variant;
  size?: Size;
  fab?: boolean;
  disabled?: boolean;
  onColor?: boolean;
  customClass?: string;
}
