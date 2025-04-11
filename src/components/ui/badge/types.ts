import type { Size, VariantsStandard } from '#ds/types';

export interface BadgeProps {
  label?: string | number;
  pill?: boolean;
  size?: Size;
  noWrap?: boolean;
  /**
   * Permite atribuir uma variação de cor ao badge.
   * Quando definido com `custom` adiciona uma classe `-variant-custom` que pode ser customizada
   * para a cor desejável com css.
   */
  variant?: VariantsStandard | 'custom';
}
