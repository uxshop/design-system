import type DSIcons from './snipets/ds-icons.json';

export type DSIconsType = keyof typeof DSIcons;

export type IconType = DSIconsType | string;
