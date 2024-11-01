import type { IAction } from '../../../types';

export interface TitlebarProps {
  title?: string | null;
  to?: Record<string, any>;
  backlink?: { to: string };
  primaryAction?: IAction;
  secondaryActions?: IAction[];
  groupActions?: {
    name: string;
    actions: IAction[];
  };
}
