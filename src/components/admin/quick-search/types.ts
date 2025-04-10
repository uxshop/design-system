import type { FormSelectOptionsProp } from '../../ui/form-select';

export interface IQuickSearchFormValue {
  searchType: string;
  searchKey: string;
}

export interface QuickSearchProps {
  title?: string;
  caption?: string;
  searchOptions: FormSelectOptionsProp[];
  modelValue: boolean;
  placeholder?: string;
  buttonLabel?: string;
}
