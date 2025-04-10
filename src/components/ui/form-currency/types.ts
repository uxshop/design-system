import type { CurrencyInputOptions } from 'vue-currency-input';
import type { FormWrapperDefaultProps, FormWrapperEmits } from '../form-wrapper/types';

export interface FormCurrencyProps extends FormWrapperDefaultProps {
  modelValue?: string | number | null;
  placeholder?: string;
  autocomplete?: string;
  min: number;
  max?: number;
  step?: string | number;
  required?: boolean;
  readonly?: boolean;
  options?: CurrencyInputOptions;
}

export interface FormCurrencyEmits extends FormWrapperEmits<string | number | null> {
  (event: 'change', value: boolean): void;
}
