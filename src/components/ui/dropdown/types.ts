export type DropdownItemButtonIconPositionOptions = 'left' | 'right';

export type IDropdownItemButton = {
  label?: string;
  close?: boolean;
  class?: string;
  /**
   * @deprecated Use `icon` instead and set `iconPosition` to `right` or `left`
   */
  leadingIcon?: string;
  icon?: string;
  /**
   * Position default is `right`
   */
  iconPosition?: DropdownItemButtonIconPositionOptions;
  iconFilled?: boolean;
  iconSize?: string;
  href?: string;
  to?: object;
};

export type IDropdownItem = {
  label?: string;
};
