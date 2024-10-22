import type { IAction } from '../../../types/IAction';

export interface EmptyDataProps {
  label?: string;
  icon?: string;
  caption?: string;
  iconType?: 'outlined' | 'filled' | 'rounded' | 'twotone' | undefined;
  link?: boolean;
  actions?: IAction;
  noBorder?: boolean;
}
