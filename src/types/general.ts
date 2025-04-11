import type { VariantStandard } from '#ds/constants';

export type Alignment = 'start' | 'center' | 'end' | 'fill';

export type Distribuition = 'center' | 'right' | 'around' | 'evenly' | 'between' | 'default';

export type DestructVariant = 'success' | 'danger' | 'highlight';

export type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

export type Size = 'sm' | 'md' | 'lg';

export type Spacing = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

export type Target = '_blank' | '_self';

/** Tipo compartilhado entre componentes, validar alterações */
export type Variant = 'primary' | 'success' | 'danger' | 'link' | 'plain' | 'default';

/**
 * Variantes padrão do design system, usado em múltiplos componentes.
 * Use apenas se o componente não tiver uma variante específica e usar diretamente esse tipo.
 */
export type VariantsStandard = Lowercase<keyof typeof VariantStandard>;
