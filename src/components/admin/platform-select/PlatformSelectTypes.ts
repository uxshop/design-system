import type { BadgeProps } from '../../ui/badge';
import type { IconType } from '../../ui/icon/types';

export type BadgeStatusType = 'beta' | 'comingSoon';

export type BadgeConfigType = { [key in BadgeStatusType]: BadgeProps };

export interface IPlatform {
  name: string;
  key: string;
  active: boolean;
  icon?: IconType;
  url: string;
  badgeStatus?: BadgeStatusType;
  disabled?: boolean;
}
