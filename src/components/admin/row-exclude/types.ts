export interface IRow {
  id: number;
  name: string;
}

export interface RowExcludeProps {
  rows: IRow[];
  modelValue: number[];
}
