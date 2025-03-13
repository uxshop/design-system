import { describe, expect, test } from 'vitest';
import { ref } from 'vue';
import type { FormWrapperProps } from '../types';
import { useMaxLength } from './useMaxLength';

describe('useMaxLength', () => {
  function createTestSetup(
    customProps: Partial<FormWrapperProps> = {
      maxlength: 100,
      allowExceedMaxLength: false,
    }
  ) {
    return {
      getComposable: () => useMaxLength(customProps),
    };
  }

  describe('currentMaxLength', () => {
    test('Dado um campo sem maxlength definido, Quando o useMaxLength é inicializado, Então currentMaxLength deve ser undefined', () => {
      const { getComposable } = createTestSetup({ maxlength: undefined });
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBeUndefined();
    });

    test('Dado um campo com maxlength igual a 100 e allowExceedMaxLength é false, Quando o useMaxLength é inicializado, Então currentMaxLength deve ser 100', () => {
      const { getComposable } = createTestSetup({ maxlength: 100, allowExceedMaxLength: false });
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBe(100);
    });

    test('Dado um campo com maxlength igual a 100 e allowExceedMaxLength é true, Quando o useMaxLength é inicializado, Então currentMaxLength deve ser undefined', () => {
      const { getComposable } = createTestSetup({ maxlength: 100, allowExceedMaxLength: true });
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBeUndefined();
    });

    test('Dado um campo com valores padrões, Quando maxlength é igual a zero, Então currentMaxLength deve ser zero', () => {
      const { getComposable } = createTestSetup({ maxlength: 0 });
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBe(0);
    });

    test('Dado um campo com valores padrões, Quando maxlength é um valor negativo, Então currentMaxLength deve ser esse valor negativo', () => {
      const { getComposable } = createTestSetup({ maxlength: -10 });
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBe(-10);
    });
  });

  describe('Reatividade do composable', () => {
    test('Dado um campo com maxlength inicial, Quando o maxlength é alterado, Então currentMaxLength deve ser atualizado', () => {
      const props = ref({ maxlength: 100, allowExceedMaxLength: false });
      const { getComposable } = createTestSetup(props.value);
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBe(100);

      props.value.maxlength = 200;
      expect(currentMaxLength.value).toBe(200);
    });

    test('Dado um campo com allowExceedMaxLength false, Quando allowExceedMaxLength é alterado para true, Então currentMaxLength deve ser undefined', () => {
      const props = ref({ maxlength: 100, allowExceedMaxLength: false });
      const { getComposable } = createTestSetup(props.value);
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBe(100);

      props.value.allowExceedMaxLength = true;
      expect(currentMaxLength.value).toBeUndefined();
    });

    test('Dado um campo com allowExceedMaxLength true, Quando allowExceedMaxLength é alterado para false, Então currentMaxLength deve ser o valor de maxlength', () => {
      const props = ref({ maxlength: 100, allowExceedMaxLength: true });
      const { getComposable } = createTestSetup(props.value);
      const { currentMaxLength } = getComposable();

      expect(currentMaxLength.value).toBeUndefined();

      props.value.allowExceedMaxLength = false;
      expect(currentMaxLength.value).toBe(100);
    });
  });

  describe('Compatibilidade com diferentes tipos de formulários', () => {
    test('Dado um campo com propriedades de outro componente, Quando useMaxLength é inicializado com extends FormWrapperProps, Então deve funcionar corretamente', () => {
      interface CustomProps extends FormWrapperProps {
        customProp: string;
      }

      const props: Partial<CustomProps> = {
        maxlength: 50,
        allowExceedMaxLength: false,
        customProp: 'test',
      };

      const { currentMaxLength } = useMaxLength<CustomProps>(props);
      expect(currentMaxLength.value).toBe(50);
    });
  });
});
