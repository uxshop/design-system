import { DateTime as EasepickDateTime } from '@easepick/bundle';
import type { Size } from '../../../types';

export interface FormDatepickerProps {
  modelValue?: string;
  config?: Record<string, unknown>;
  placeholder?: string;
  label?: string;
  range?: boolean;
  noClear?: boolean;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  float?: boolean;
  labelInfo?: string;
  state?: boolean;
  invalidFeedback?: string;
  last?: boolean;
  autofocus?: boolean;
}

export interface EasyPickDetails {
  start?: EasepickDateTime | null;
  end?: EasepickDateTime | null;
  date?: EasepickDateTime | null;
}
