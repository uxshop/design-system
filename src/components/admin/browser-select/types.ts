import type { IApiResource } from '../../../types/IApiResource';

export interface BrowserSelectProps {
  selectOne?: boolean;
  baseParams?: unknown; //antes era never
  searchBy?: string | null;
  identifier?: string;
  limit?: number;
  title?: string;
  modelValue?: any;
  templateCustom?: any;
  service: {
    get(params: any): Promise<IApiResource>;
  };
}
