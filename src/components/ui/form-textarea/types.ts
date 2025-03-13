import type { InputMode } from '../../../types';
import type { FormWrapperProps } from '../form-wrapper';
import type { FormWrapperEmits } from '../form-wrapper/types';

export interface FormTextareaProps extends FormWrapperProps {
  rows?: string | number;
  placeholder?: string;
  tabindex?: string;
  inputmode?: InputMode;
  pattern?: string;
  title?: string;
  name?: string;
  autocomplete?: string;
  required?: boolean;
  readonly?: boolean;
}

export interface FormTextareaEmits extends FormWrapperEmits<string> {
  (e: 'update', val: string): void;
}
