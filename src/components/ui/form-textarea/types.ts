import type { InputMode } from '../../../types';

export interface FormTextareaProps {
  leadingIcon?: string;
  trailingIcon?: string;
  state?: boolean;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  invalidFeedback?: string;
  modelValue?: any;
  rows?: string | number;
  label?: string;
  placeholder?: string;
  tabindex?: string;
  inputmode?: InputMode;
  id?: string;
  pattern?: string;
  title?: string;
  name?: string;
  autocomplete?: string;
  minlength?: string | number;
  maxlength?: string | number;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  labelInfo?: string;
}
