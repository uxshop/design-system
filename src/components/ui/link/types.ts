export interface LinkProps {
  disabled?: boolean;
  external?: boolean;
  href?: string;
  label?: string;
  /** @deprecated Essa propriedade está depreciada e será removida em breve. Use o href no lugar ou trate via evento. */
  to?: string | object;
  wrapText?: boolean;
}
