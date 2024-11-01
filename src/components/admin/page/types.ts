import type { IAction } from '../../../types';
import type { IArticle } from '../page-helper-articles';
import type { IVideo } from '../page-helper-video';

export interface PageProps {
  hideTitle?: boolean;
  primaryAction?: IAction;
  secondaryActions?: IAction[];
  to?: Record<string, any>;
  backlink?: { to: string };
  size?: 'sm' | 'md' | 'lg' | 'full';
  videoHelp?: IVideo;
  articlesHelp?: IArticle[];
  footerHelp?: any;
  title?: string;
  groupActions?: {
    name: string;
    actions: IAction[];
  };
}
