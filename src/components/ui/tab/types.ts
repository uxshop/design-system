export interface TabProviderInterface {
  tabs: any;
  activeTabIndex: number | string;
  active(index: number | string, evt?: unknown): void;
}

export interface TabProps {
  modelValue: any;
}

export interface TabItemProps {
  label?: string;
  index?: any;
  badge?: string | number;
}
