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
  /** @deprecated Essa propriedade está depreciada e será removida em breve. Use o href no lugar ou trate via evento. */
  to?: object;
};

export type IDropdownItem = {
  label?: string;
};

export interface DropdownProps {
  dropUp?: boolean;
  right?: boolean;
  left?: boolean;
  closeOn?: boolean;
  noCloseOnClickTag?: string;
  disabled?: boolean;
}
