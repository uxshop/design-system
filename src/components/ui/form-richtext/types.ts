export interface FormRichtextProps {
  modelValue?: any;
  name?: string;
  placeholder?: string;
  label?: string;
  height?: string | number;
  config?: Record<string, string>;
  configCallbacks?: Record<string, () => {}>;
}

export type TRedactor = {
  editor: {
    focus(): void;
    source: {
      setCode(val: any): void;
    };
  };
} | null;
