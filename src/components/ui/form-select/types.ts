import type { Size } from '../../../types';

export interface IFormSelectOptions {
  value: any;
  label?: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  leadingIcon?: string;
  trailingIcon?: string;
  labelInfo?: string;
  trailingText?: string;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  modelValue?: any;
  value?: any;
  placeholder?: string;
  label?: string;
  id?: string;
  size?: Size;
  autofocus?: boolean;
  readonly?: boolean;
  tabindex?: string;
  name?: string;
  title?: string;
  required?: boolean;
  options?: IFormSelectOptions[];
  disabled?: boolean;
  state?: boolean;
  invalidFeedback?: string;
}

export interface FormSelectOptionProps {
  value?: string | object | number;
}
