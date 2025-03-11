import { computed, type ModelRef } from 'vue';
import type { FormWrapperProps } from '../types';

export function useCharacterCount(model: ModelRef<string | number | null | undefined>, props: FormWrapperProps) {
  /**
   * Calcula o tamanho atual do valor do campo
   */
  const currentLength = computed(() =>
    model.value !== null && model.value !== undefined ? model.value.toString().length : 0
  );

  /**
   * Calcula a quantidade de caracteres restantes
   */
  const remainingCharacters = computed(() => {
    if (!props.maxlength) return undefined;

    return props.maxlength - currentLength.value;
  });

  /**
   * Verifica se o campo excedeu o limite de caracteres
   */
  const isExceeded = computed(() => {
    if (!props.maxlength) return false;

    return currentLength.value > props.maxlength;
  });

  /**
   * Retorna o texto do elemento de acordo com a quantidade de caracteres restantes
   */
  const getElement = computed(() => {
    const count = remainingCharacters.value;

    return (count === 1 ? props.textsCounter?.wordElement?.singular : props.textsCounter?.wordElement?.plural) || '';
  });

  /**
   * Retorna o texto da palavra "restante" de acordo com a quantidade de caracteres restantes
   */
  const getRemaining = computed(() => {
    const count = remainingCharacters.value;
    return (
      (count === 1 ? props.textsCounter?.wordRemaining?.singular : props.textsCounter?.wordRemaining?.plural) || ''
    );
  });

  /**
   * Determina o texto do contador baseado no estado atual
   */
  const counterText = computed(() => {
    if (!props.maxlength) return '';

    if (currentLength.value === 0) {
      return props.textsCounter?.counterInitialLimit
        .replace('{{amount}}', String(props.maxlength))
        .replace('{{element}}', getElement.value);
    }

    if (remainingCharacters.value && remainingCharacters.value > 0) {
      return props.textsCounter?.counterRemaining
        .replace('{{amount}}', String(remainingCharacters.value))
        .replace('{{element}}', getElement.value)
        .replace('{{remaining}}', getRemaining.value);
    }

    if (remainingCharacters.value === 0) {
      return props.textsCounter?.counterExceeded.replace('{{element}}', getElement.value || '');
    }

    return props.textsCounter?.counterReachedLimit
      .replace('{{amount}}', String(Math.abs(remainingCharacters.value || 0)))
      .replace(
        '{{element}}',
        Math.abs(remainingCharacters.value || 0) === 1
          ? props.textsCounter?.wordElement?.singular || ''
          : props.textsCounter?.wordElement?.plural || ''
      );
  });

  /**
   * Determina o estado do campo baseado nas regras de validação
   */
  const internalState = computed<undefined | boolean>(() => {
    if (!props.maxlength) return props.state;

    if (isExceeded.value) return false;

    return undefined;
  });

  /**
   * Determina se o texto do contador deve ser exibido em cada tipo de feedback
   */
  const shouldShowCounterText = (type: 'help' | 'invalid') =>
    computed(() => {
      if (!props.maxlength) return false;

      const isHelpType = type === 'help';

      if (!isHelpType) {
        return isExceeded.value && !props.allowExceedMaxLength && !props.invalidFeedback;
      }

      return (!isExceeded.value || props.allowExceedMaxLength) && !props.helpFeedback;
    });

  return {
    currentLength,
    internalState,
    remainingCharacters,
    isExceeded,
    counterText,
    shouldShowCounterText,
  };
}
