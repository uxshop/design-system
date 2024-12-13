import type { Size, Variant } from '../../../types';

export interface ButtonProps {
  variant?: Variant;
  label?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  size?: Size;
  href?: string;
  flush?: 'left' | 'right';
  block?: boolean;
  /** @deprecated Essa propriedade está depreciada e será removida em breve. Use o href no lugar ou trate via evento. */
  to?: object;
  spinnerBorder?: number | string;
  type?: string;
  loading?: boolean;
  outline?: boolean;
  disclosure?: boolean;
  target?: '_blank' | '_self';
  disabled?: boolean;
}
