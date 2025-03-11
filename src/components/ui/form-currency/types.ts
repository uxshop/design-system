import type { Size } from '#ds/types/general';
import type { CurrencyInputOptions } from 'vue-currency-input';

export interface FormCurrencyProps {
  leadingIcon?: string;
  trailingIcon?: string;
  labelInfo?: string;
  state?: boolean;
  invalidFeedback?: string;
  loading?: boolean;
  last?: boolean;
  float?: boolean;
  modelValue?: string | number | null;
  label?: string;
  placeholder?: any;
  size?: Size;
  id?: string;
  autocomplete?: string;
  min?: number;
  max?: number;
  step?: string | number;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  options?: CurrencyInputOptions;
}

export interface FormCurrencyEmits {
  (event: 'update:modelValue', value: string | number | null): void;
  (event: 'change', value: boolean): void;
}
