import type { IFormSelectOptions } from '../../ui/form-select';

export interface IQuickSearchFormValue {
  searchType: string;
  searchKey: string;
}

export interface QuickSearchProps {
  title?: string;
  caption?: string;
  searchOptions: IFormSelectOptions[];
  modelValue: boolean;
  placeholder?: string;
  buttonLabel?: string;
}
