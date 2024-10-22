import type { Size } from '../../../types';

export interface FormSpinbuttonProps {
  modelValue: number;
  min?: string | number;
  max?: string | number;
  placeholder?: string;
  size?: Size;
  step?: string | number;
  loading?: boolean;
  disabled?: boolean;
  inputable?: boolean;
}
