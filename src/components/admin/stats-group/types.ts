export interface StatsGroupPropsInfo {
  label: string;
  value: string;
  primaryAction?: { text: string; to?: object; href?: string; button?: boolean }[];
  text: string;
}

export interface StatsGroupProps {
  infos?: StatsGroupPropsInfo[];
}
