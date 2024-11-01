import type { IAction, Size } from '../../../types';

export interface AsideProps {
  modelValue?: boolean;
  title?: string;
  subtitle?: string;
  scrollable?: boolean;
  noCloseOnBackdrop?: boolean;
  size?: Size;
  tag?: string;
  inner?: boolean;
  primaryAction?: IAction;
  secondaryActions?: IAction[];
  scrollableContentId?: string;
}

export interface AsideSectionProps {
  title?: string;
  actions?: IAction[];
}
