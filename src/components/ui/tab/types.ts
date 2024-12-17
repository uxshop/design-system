export interface TabProviderInterface {
  tabs: (string | number)[];
  activeTabIndex: number | string;
  active(index: number | string, evt?: unknown): void;
}

export interface TabProps {
  modelValue: number | string;
}

export interface TabItemProps {
  label?: string;
  index?: any;
  badge?: string | number;
  disabled?: boolean;
}
