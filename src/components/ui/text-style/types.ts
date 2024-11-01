import type { Variant } from '../../../types';

export type TextStyleVariant = Omit<Variant, 'link' | 'plain'> | 'strong' | 'muted';

export interface TextStyleProps {
  block?: boolean;
  label?: string;
  tag?: string;
  variant?: TextStyleVariant;
}
