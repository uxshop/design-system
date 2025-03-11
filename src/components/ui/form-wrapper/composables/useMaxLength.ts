import { computed } from 'vue';
import type { FormWrapperProps } from '../types';

/**
 * Composable que define o valor do atributo maxlength para ser aplicado no input HTML
 */
export function useMaxLength<T>(props: Partial<T extends FormWrapperProps ? T : FormWrapperProps>) {
  /**
   * Determina se o atributo maxlength deve ser aplicado no HTML
   * - Se allowExceedMaxLength for true, retorna undefined para não restringir a entrada
   * - Se allowExceedMaxLength for false, retorna o maxlength para restringir a entrada
   */
  const currentMaxLength = computed(() => {
    if (props.maxlength && props.allowExceedMaxLength) return undefined;

    return props.maxlength;
  });

  return {
    currentMaxLength,
  };
}
