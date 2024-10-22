export interface FormValidationProps {
  modelValue?: Record<string, string[]>;
  translate?: Record<string, string | Record<string, string>>;
  scrollToTop?: boolean;
  title?: string;
  hideKey?: boolean;
  noDismissible?: boolean;
}
