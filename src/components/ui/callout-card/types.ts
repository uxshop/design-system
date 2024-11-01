import type { IAction } from '../../../types';

export interface CalloutCardProps {
  title?: string;
  icon?: string;
  primaryAction?: IAction;
  justifyCardActions?: string;
  bgColorIconPrimary?: boolean;
}
