export interface IContext {
  loaded(): void;
  noMore(): void;
}

export interface InfiniteScrollProps {
  load: any;
  spinnerSize?: any;
  scrollableElementId?: string;
}
