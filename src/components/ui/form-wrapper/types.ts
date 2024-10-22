import type { Size } from '../../../types';

export interface FormWrapperProps {
  leadingIcon?: string;
  trailingIcon?: string;
  labelInfo?: string;
  trailingText?: string;
  state?: boolean;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  disabled?: boolean;
  invalidFeedback?: string;
  autofocus?: boolean;
  size?: Size;
  label?: string;
  id?: string;
}
