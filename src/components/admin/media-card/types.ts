import type { IAction } from '../../../types';

export interface MediaCardProps {
  title: string;
  text: string;
  video?: string;
  image?: string;
  imageHref?: string;
  imageTarget?: '_blank' | '_self';
  inverse?: boolean;
  buttons?: IAction[];
  vertical?: boolean;
  maxMediaHeight?: number;
}
