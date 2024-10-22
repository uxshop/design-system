export interface StatsItemPropsPrimaryAction {
  text: string;
  to?: object;
  href?: string;
  button?: boolean;
}

export interface StatsItemProps {
  label?: string;
  value?: string | number;
  perc?: string | number;
  info?: string;
  primaryAction?: StatsItemPropsPrimaryAction[];
  text?: string;
}
