import { describe, expect, test } from 'vitest';
import { ref, type Ref } from 'vue';
import type { FormWrapperProps, ValueOfFormText } from '../types';
import { useCharacterCount } from './useCharacterCount';

describe('useCharacterCount', () => {
  /**
   * Factory para criar os elementos de teste
   * @param initialValue - Valor inicial do model
   * @param customProps - Props customizadas para sobrescrever os valores padrões
   */
  function createTestSetup(initialValue: ValueOfFormText = '', customProps: Partial<FormWrapperProps> = {}) {
    const model: Ref<ValueOfFormText> = ref(initialValue);

    const defaultProps: FormWrapperProps = {
      maxlength: 100,
      allowExceedMaxLength: false,
      showCounter: true,
      textsCounter: {
        counterInitialLimit: 'Você pode digitar até {{amount}} {{element}}',
        counterRemaining: 'Você tem {{amount}} {{element}} {{remaining}}',
        counterExceeded: 'Você atingiu o limite de {{element}}',
        counterReachedLimit: 'Você excedeu o limite em {{amount}} {{element}}',
        wordRemaining: {
          singular: 'restante',
          plural: 'restantes',
        },
        wordElement: {
          singular: 'caractere',
          plural: 'caracteres',
        },
      },
    };

    const props = { ...defaultProps, ...customProps };

    return {
      model,
      props,
      getComposable: () => useCharacterCount(model as any, props),
    };
  }

  describe('Input e TextArea sem restrição (allowExceedMaxLength = false)', () => {
    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário não digitou nenhum caractere, Então a mensagem exibida deve ser "Você pode digitar até 100 caracteres"', () => {
      const { getComposable } = createTestSetup('');
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você pode digitar até 100 caracteres');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário digita 1 caractere, Então a mensagem exibida deve ser "Você tem 99 caracteres restantes"', () => {
      const { getComposable } = createTestSetup('a');
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você tem 99 caracteres restantes');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário digita 99 caracteres, Então a mensagem exibida deve ser "Você tem 1 caractere restante"', () => {
      const { getComposable } = createTestSetup('a'.repeat(99));
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você tem 1 caractere restante');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário digita 100 caracteres, Então a mensagem exibida deve ser "Você atingiu o limite de caracteres"', () => {
      const { getComposable } = createTestSetup('a'.repeat(100));
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você atingiu o limite de caracteres');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário digita 101 caracteres, Então a mensagem exibida deve ser "Você excedeu o limite em 1 caractere" E o campo de feedback deve ficar vermelho', () => {
      const { getComposable } = createTestSetup('a'.repeat(101));
      const { counterText, internalState } = getComposable();

      expect(counterText.value).toBe('Você excedeu o limite em 1 caractere');
      expect(internalState.value).toBe(false);
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está desativada, Quando o usuário digita 199 caracteres, Então a mensagem exibida deve ser "Você excedeu o limite em 99 caracteres" E o campo de feedback deve ficar vermelho', () => {
      const { getComposable } = createTestSetup('a'.repeat(199));
      const { counterText, internalState } = getComposable();

      expect(counterText.value).toBe('Você excedeu o limite em 99 caracteres');
      expect(internalState.value).toBe(false);
    });
  });

  describe('Input e TextArea com restrição (allowExceedMaxLength = true)', () => {
    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está ativada, Quando o usuário não digitou nenhum caractere, Então a mensagem exibida deve ser "Você pode digitar até 100 caracteres"', () => {
      const { getComposable } = createTestSetup('', { allowExceedMaxLength: true });
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você pode digitar até 100 caracteres');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está ativada, Quando o usuário digita 1 caractere, Então a mensagem exibida deve ser "Você tem 99 caracteres restantes"', () => {
      const { getComposable } = createTestSetup('a', { allowExceedMaxLength: true });
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você tem 99 caracteres restantes');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está ativada, Quando o usuário digita 99 caracteres, Então a mensagem exibida deve ser "Você tem 1 caractere restante"', () => {
      const { getComposable } = createTestSetup('a'.repeat(99), { allowExceedMaxLength: true });
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você tem 1 caractere restante');
    });

    test('Dado um campo de entrada com limite de 100 caracteres e a restrição de caracteres está ativada, Quando o usuário digita 100 caracteres, Então a mensagem exibida deve ser "Você atingiu o limite de caracteres"', () => {
      const { getComposable } = createTestSetup('a'.repeat(100), { allowExceedMaxLength: true });
      const { counterText } = getComposable();

      expect(counterText.value).toBe('Você atingiu o limite de caracteres');
    });
  });

  describe('Comportamento do estado interno', () => {
    test('Quando não há maxlength definido, o internalState deve retornar o valor da prop state', () => {
      const { getComposable } = createTestSetup('', { maxlength: undefined, state: true });
      const { internalState } = getComposable();

      expect(internalState.value).toBe(true);
    });

    test('Quando o texto não excede o limite, o internalState deve ser undefined', () => {
      const { getComposable } = createTestSetup('a'.repeat(50));

      const { internalState } = getComposable();
      expect(internalState.value).toBeUndefined();
    });

    test('Quando o texto excede o limite, o internalState deve ser false independentemente de allowExceedMaxLength', () => {
      const { getComposable } = createTestSetup('a'.repeat(101), { allowExceedMaxLength: true });
      const { internalState } = getComposable();

      expect(internalState.value).toBe(false);
    });
  });

  describe('Exibição do texto do contador', () => {
    test('shouldShowCounterText("help") deve retornar true quando o texto não excede o limite', () => {
      const { getComposable } = createTestSetup('a'.repeat(50));
      const { shouldShowCounterText } = getComposable();

      expect(shouldShowCounterText('help').value).toBe(true);
    });

    test('shouldShowCounterText("invalid") deve retornar true quando o texto excede o limite', () => {
      const { getComposable } = createTestSetup('a'.repeat(101));
      const { shouldShowCounterText } = getComposable();

      expect(shouldShowCounterText('invalid').value).toBe(true);
    });
  });

  describe('currentLength', () => {
    test('Deve retornar 0 quando o valor for uma string vazia', () => {
      const { getComposable } = createTestSetup('');
      const { currentLength } = getComposable();

      expect(currentLength.value).toBe(0);
    });

    test('Deve retornar o comprimento correto de uma string', () => {
      const { getComposable } = createTestSetup('teste');
      const { currentLength } = getComposable();

      expect(currentLength.value).toBe(5);
    });

    test('Deve retornar o comprimento correto de um número convertido para string', () => {
      const { model, getComposable } = createTestSetup();
      model.value = 12345;
      const { currentLength } = getComposable();

      expect(currentLength.value).toBe(5);
    });

    test('Deve retornar 0 quando o valor for null', () => {
      const { model, getComposable } = createTestSetup();
      model.value = null;
      const { currentLength } = getComposable();

      expect(currentLength.value).toBe(0);
    });

    test('Deve retornar 0 quando o valor for undefined', () => {
      const { model, getComposable } = createTestSetup();
      model.value = undefined as any;
      const { currentLength } = getComposable();

      expect(currentLength.value).toBe(0);
    });
  });

  describe('isExceeded', () => {
    test('Deve retornar false quando não houver maxlength definido', () => {
      const { getComposable } = createTestSetup('texto qualquer', { maxlength: undefined });
      const { isExceeded } = getComposable();

      expect(isExceeded.value).toBe(false);
    });

    test('Deve retornar false quando o texto estiver abaixo do limite', () => {
      const { getComposable } = createTestSetup('texto', { maxlength: 10 });
      const { isExceeded } = getComposable();

      expect(isExceeded.value).toBe(false);
    });

    test('Deve retornar false quando o texto estiver exatamente no limite', () => {
      const { getComposable } = createTestSetup('0123456789', { maxlength: 10 });
      const { isExceeded } = getComposable();

      expect(isExceeded.value).toBe(false);
    });

    test('Deve retornar true quando o texto exceder o limite', () => {
      const { getComposable } = createTestSetup('01234567890', { maxlength: 10 });
      const { isExceeded } = getComposable();

      expect(isExceeded.value).toBe(true);
    });

    test('Deve retornar true independentemente do valor de allowExceedMaxLength', () => {
      const { getComposable } = createTestSetup('01234567890', {
        maxlength: 10,
        allowExceedMaxLength: true,
      });
      const { isExceeded } = getComposable();

      expect(isExceeded.value).toBe(true);
    });
  });
});
