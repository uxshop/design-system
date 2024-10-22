export interface TableRowProps {
  to?: any;
  head?: boolean;
}

export interface TableCellProps {
  action?: boolean;
  drag?: boolean;
  auto?: boolean;
  handle?: boolean;
  width?: string | number;
  noWrap?: boolean;
}

export interface TableProps {
  hover?: boolean;
  noPadding?: boolean;
  tiny?: boolean;
}
