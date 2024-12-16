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
  allowDuplication?: boolean;
}

export interface ITableListState {
  queryParams: any;
  omitFilters: any;
  config: ITableListConfig;
  tabs: any[];
  currentTab: any;
  term: string | null;
  omitFiltersValues: any;
  fetchData(): void;
  setQueryParams(params: any): void;
  resetQueryParams(params: any): void;
  removeFilter(params: any): void;
  removeSelected(params: any): void;
  toggleActiveSelected(i: boolean): void;
  activeOne(item: any, i: boolean): void;
  deleteOne(item: any): void;
  clickRow(item: any): void;
}

export interface TableListProps {
  config: ITableListConfig;
  filters?: any;
  placeholder?: string;
  to?: any;
}

export interface TableListItemProps {
  auto?: boolean;
  nowrap?: boolean;
}

export interface TableListTagsProps {
  state: ITableListState;
}

export interface TableListTabsProps {
  queryParams?: Record<string, any>;
  state: any;
}

export interface TableListTablePros {
  state: ITableListState;
  rows: Record<string, any>[];
  selected: number[];
  to?: any;
}

export interface TableListNavPaginationProps {
  meta: any;
  state: ITableListState;
}

export interface TableListNavLoaderProps {
  loading: boolean;
}

export interface TableListNavFilterSidebarProps {
  filters: any;
  currentFilters: Record<string, any>;
}

export interface TableListNavFilterProps {
  state: ITableListState;
}

export interface TableListNavBulkProps {
  rows: unknown[];
  selected: number[];
  config: ITableListConfig;
  state: any;
}

export interface TableListNavSearchProps {
  state: ITableListState;
  placeholder: string;
}

export interface TableListNavRefreshProps {
  state: any;
}

export interface TableListNavProps {
  loading: boolean;
}

export interface TableListNavSortableProps {
  setQueryParams(a: Record<string, any>): void;
  sortable: any;
  queryParams: any;
}

export interface TableListNavCustomFilterProps {
  state: ITableListState;
  service: {
    get(params: any): Promise<void>;
    create(data: any): Promise<void>;
    update(id: number, data: any): Promise<void>;
    delete(id: number): Promise<void>;
  };
}

export interface TableListEmptyMessageProps {
  msg?: string;
}
