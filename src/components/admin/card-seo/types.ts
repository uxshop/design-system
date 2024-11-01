import type { SeoInterface } from '../seo/types';

export interface CardSeoProps {
  modelValue: SeoInterface;
  keyTitle?: string;
  keySubTitle?: string;
  keyDescription?: string;
  domain: string;
}
