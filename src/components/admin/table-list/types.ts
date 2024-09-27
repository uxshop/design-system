import type { TApiData } from '../../../types';

export type TBulkActions = {
  label: string;
  variant?: string;
  onAction(a: number[]): void;
}[];

export interface TDialogDelete {
  title?: string;
  destructIcon?: string;
  destructLabel?: string;
  message?: {
    text: string;
    concatMessage?: boolean;
  };
}

export interface ITableListConfig {
  service: any;
  customFilterService?: any;
  customFilterPresets?: any;
  customFilterResource?: string;
  queryParams?: object;
  onGet?(i: TApiData[] | null): void;
  remove?(i: TApiData): Promise<void>;
  omitFilters?: string[];
  hideCheckbox?: boolean;
  empty?: string;
  register?: string;
  filters?: any;
  sortable?: any;
  bulk?: TBulkActions;
  actions?: string[];
  placeholder?: string;
  omitFiltersValues?: string[];
  dialogDelete?: TDialogDelete;
  hideTabsFilter?: boolean;
  hideButtonFilter?: boolean;
}
