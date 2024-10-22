export interface SeoInterface {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  slug?: string;
  name?: string;
  [key: string]: string | undefined;
}

export interface SeoProps {
  title?: string;
  domain?: string;
  modelValue: SeoInterface;
  viewOnly?: boolean;
  writeOnly?: boolean;
  isMetaTitle?: boolean;
  gray?: boolean;
  slugify?: boolean;
  keyTitle?: string;
  keySubTitle?: string;
  keyDescription?: string;
  metaTitle?: string;
}
