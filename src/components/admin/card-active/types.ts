export interface CardActiveProps {
  modelValue: any;
  hideDelete?: boolean;
  preventActive?(): void;
  delete?(id: number): Promise<void>;
}
