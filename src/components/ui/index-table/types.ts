export interface KeyLabelDefault {
  label: string;
  key: string;
}

export interface Tab extends KeyLabelDefault {
  active: boolean;
}

export interface IndexTableTabsProps {
  tabs: Tab[];
}

export interface IndexTableTabsEmits {
  (event: 'open-tab', key: string): void;
}

export interface ActionsToShow {
  select: boolean;
  reload: boolean;
  search: boolean;
  order: boolean;
  customFilters: boolean;
  filters: boolean;
}

export interface IndexTablePaginationItemProps {
  from: number;
  to: number;
  page: number;
  size: number;
  total: number;
}

export interface ActionOrdination extends KeyLabelDefault {
  active: boolean;
}

export interface IndexTableOrderButtonProps {
  ordination: null | ActionOrdination[];
}

export interface IndexTableActionsProps extends IndexTableOrderButtonProps {
  show: ActionsToShow;
  pagination: null | IndexTablePaginationItemProps;
  activeFilterTags: KeyLabelDefault[];
  bulkActions: KeyLabelDefault[];
  isLoading: boolean;
}

export interface IndexTableOrderButtonEmits {
  (event: 'order-by', key: string): void;
}

export interface IndexTableActionsSlots {
  actions(): unknown;
  pagination(): unknown;
}

export interface IndexTablePaginationItemEmits {
  (event: 'next-page'): void;
  (event: 'previous-page'): void;
}

export interface IndexTableActionsEmits extends IndexTableOrderButtonEmits, IndexTablePaginationItemEmits {
  (event: 'clear-search'): void;
  (event: 'reload'): void;
  (event: 'filters'): void;
  (event: 'save-custom-filter', activeFilters: KeyLabelDefault[]): void;
  (event: 'select-all', value: boolean): void;
}

export interface IndexTableProps extends IndexTableTabsProps, IndexTableActionsProps {}

export interface IndexTableEmits extends IndexTableTabsEmits, IndexTableActionsEmits {}
