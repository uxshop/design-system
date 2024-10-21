import type { Size } from '../../../types';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

export interface FormAutocompleteProps {
  modelValue?: any;
  placeholder?: string;
  options?: AutocompleteOption[];
  label?: string;
  size?: Size;
  last?: boolean;
  template?: any;
  position?: 'top' | 'bottom' | 'auto';
  config?: Record<string, any>;
  required?: boolean;
}
