import type DSIcons from './snipets/ds-icons.json';

export type DSIconsType = keyof typeof DSIcons;

export type IconType = DSIconsType | string;

export interface IconProps {
  filled?: boolean;
  name?: IconType;
  size?: number | string;
}
