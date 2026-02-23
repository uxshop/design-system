export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: string;
}

export interface ComponentBundle {
  name: string;
  category: 'ui' | 'admin';
  dirPath: string;
  files: {
    vue: string | null;
    stories: string | null;
    scss: string | null;
  };
  props: PropDefinition[];
  subcomponents: string[];
  hasStories: boolean;
  hasScss: boolean;
}

export interface TokenEntry {
  name: string;
  value: string;
  category: string;
  group?: string;
  theme?: 'light' | 'dark' | 'both';
  brand?: 'default' | 'tray' | 'bagy' | 'rede';
}

export interface ComponentCatalogEntry {
  name: string;
  exportName: string;
  category: 'ui' | 'admin';
  dirPath: string;
  hasStories: boolean;
  hasScss: boolean;
  subcomponents: string[];
  propsCount: number;
}

export type TokenCategory = 'colors' | 'spacing' | 'borders' | 'shadows' | 'typography' | 'motion' | 'z-index' | 'all';

export type BrandName = 'default' | 'tray' | 'bagy' | 'rede';

export type ComponentCategory = 'ui' | 'admin' | 'all';
