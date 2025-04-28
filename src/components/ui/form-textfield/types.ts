import type { ActionButton } from '#ds/types';
import type { MaskType } from 'maska';
import type { FormWrapperProps } from '../form-wrapper';
import type { FormWrapperEmits } from '../form-wrapper/types';

export interface FormTextfieldEmits extends FormWrapperEmits {
  (event: 'update', value: any): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'keydown', event: Event): void;
  (e: 'keydownEnter', event: Event): void;
  (e: 'clear'): void;
  (e: 'updateRaw', val: any): void;
}

export interface FormTextfieldProps extends FormWrapperProps {
  placeholder?: string;
  step?: string | number;
  tabindex?: string;
  inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  pattern?: string;
  title?: string;
  name?: string;
  clearable?: boolean;
  autocomplete?: string;
  required?: boolean;
  readonly?: boolean;
  type?: string;
  mask?: MaskType;
  raw?: any;
  actions?: ActionButton[];
  max?: string | number;
  min?: string | number;
}
