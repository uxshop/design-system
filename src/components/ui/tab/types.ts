export interface TabProviderInterface {
  tabs: {
    view: string;
  };
  activeTabIndex: number | string;
  active(index: number | string, evt?: unknown): void;
}

export interface TabProps {
  modelValue: string;
}

export interface TabItemProps {
  label?: string;
  index?: any;
  badge?: string | number;
}
