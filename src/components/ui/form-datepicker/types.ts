import { DateTime as EasepickDateTime } from '@easepick/bundle';
import type { FormWrapperDefaultProps, FormWrapperEmits } from '../form-wrapper/types';

export interface EasepickCofigsProp {
  singleMode?: boolean;
  numberOfMonths?: number;
  numberOfColumns?: number;
}

export interface FormDatepickerProps extends FormWrapperDefaultProps {
  modelValue?: string;
  config?: Record<string, unknown> & EasepickCofigsProp;
  placeholder?: string;
  range?: boolean;
  noClear?: boolean;
}

export interface EasyPickDetails {
  start?: EasepickDateTime | null;
  end?: EasepickDateTime | null;
  date?: EasepickDateTime | null;
}

export interface FormDatepickerEmits extends FormWrapperEmits<string | null> {
  (event: 'update', value: string | null): void;
}
