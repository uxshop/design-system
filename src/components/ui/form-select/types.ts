import type { FormWrapperDefaultProps, FormWrapperEmits } from '../form-wrapper/types';

export interface FormSelectOptionsProp {
  value: any;
  label?: string;
  disabled?: boolean;
}

export interface FormSelectProps extends FormWrapperDefaultProps {
  modelValue?: any;
  value?: any;
  placeholder?: string;
  readonly?: boolean;
  tabindex?: string;
  name?: string;
  title?: string;
  required?: boolean;
  options?: FormSelectOptionsProp[];
}

export interface FormSelectOptionProps {
  value?: string | object | number;
}

export interface FormSelectEmits extends FormWrapperEmits<any> {
  (event: 'update', value: any): void;
}
