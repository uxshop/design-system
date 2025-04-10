import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { FormWrapperDefaultProps } from '../form-wrapper/types';
import FormCurrency from './FormCurrency.vue';

describe('FormCurrency', () => {
  function createComponent(customProps = {}, mountOptions = {}) {
    const wrapper = mount(FormCurrency, {
      props: {
        modelValue: '100.00',
        placeholder: 'Digite um valor',
        min: 0,
        ...customProps,
      },
      ...mountOptions,
      stubs: {
        FormWrapper: true,
      },
    });

    return {
      wrapper,
      input: () => wrapper.find('input'),
      formWrapper: () => wrapper.findComponent(FormWrapper),
    };
  }

  describe('Renderização', () => {
    test('Dado um componente FormCurrency básico, Quando é renderizado, Então deve conter um elemento input', () => {
      const { input } = createComponent();

      expect(input().exists()).toBe(true);
    });

    test('Dado um componente FormCurrency com placeholder, Quando é renderizado, Então o input deve ter o placeholder correto', () => {
      const placeholder = 'Teste placeholder';
      const { input } = createComponent({ placeholder, float: false });

      expect(input().attributes('placeholder')).toBe(placeholder);
    });
  });

  describe('Eventos', () => {
    test('Dado um componente FormCurrency, Quando o input perde o foco após alteração, Então deve emitir o evento change', async () => {
      const { input, wrapper } = createComponent();

      await input().trigger('focus');
      await input().trigger('blur');

      expect(wrapper.emitted().change).toBeTruthy();
    });
  });

  describe('Estado de input', () => {
    test('Dado um componente FormCurrency, Quando está disabled, Então o input deve estar desabilitado', () => {
      const { input } = createComponent({ disabled: true });

      expect(input().attributes('disabled')).toBeDefined();
    });

    test('Dado um componente FormCurrency, Quando está readonly, Então o input deve ter o atributo readonly', () => {
      const { input } = createComponent({ readonly: true });

      expect(input().attributes('readonly')).toBeDefined();
    });

    test('Dado um componente FormCurrency, Quando está required, Então o input deve ter o atributo required', () => {
      const { input } = createComponent({ required: true });

      expect(input().attributes('required')).toBeDefined();
    });

    test('Dado um componente FormCurrency com state=false, Quando é renderizado, Então o input deve ter a classe -invalid', () => {
      const { input } = createComponent({ state: false });

      expect(input().classes()).toContain('-invalid');
    });

    test('Dado um componente FormCurrency com state=true, Quando é renderizado, Então o input deve ter a classe -valid', () => {
      const { input } = createComponent({ state: true });

      expect(input().classes()).toContain('-valid');
    });
  });

  describe('Integração com FormWrapper', () => {
    test('Dado um componente FormCurrency, Quando eventos internos são emitidos do FormWrapper, Então deve propagar corretamente', async () => {
      const { wrapper, formWrapper } = createComponent();

      await formWrapper().vm.$emit('internal-state', false);

      expect(wrapper.emitted('internal-state')).toBeTruthy();
      expect(wrapper.emitted('internal-state')?.[0]).toEqual([false]);
    });

    test('Dado um componente FormCurrency com label, Quando é renderizado, Então deve passar o label para FormWrapper', () => {
      const label = 'Valor (R$)';
      const { formWrapper } = createComponent({ label });

      expect(formWrapper().props('label')).toBe(label);
    });

    test('Dado um componente FormCurrency com invalidFeedback, Quando é renderizado, Então deve passar o invalidFeedback para FormWrapper', () => {
      const invalidFeedback = 'Valor inválido';
      const { formWrapper } = createComponent({ invalidFeedback, state: false });

      expect(formWrapper().props('invalidFeedback')).toBe(invalidFeedback);
    });

    test('Dado um componente FormCurrency com helpFeedback, Quando é renderizado, Então deve passar o helpFeedback para FormWrapper', () => {
      const helpFeedback = 'Informe um valor entre R$ 10 e R$ 100';
      const { formWrapper } = createComponent({ helpFeedback });

      expect(formWrapper().props('helpFeedback')).toBe(helpFeedback);
    });

    test('Dado um componente FormCurrency, Quando é renderizado, Então deve passar todas as props necessárias para FormWrapper', () => {
      const testProps: Required<FormWrapperDefaultProps> = {
        id: 'test-id',
        leadingIcon: 'cash',
        trailingIcon: 'arrow-down',
        trailingText: 'R$',
        label: 'Valor monetário',
        loading: true,
        last: true,
        disabled: true,
        labelInfo: 'Informação adicional',
        float: true,
        state: false,
        autofocus: true,
        size: 'lg',
        invalidFeedback: 'Mensagem de erro',
        helpFeedback: 'Mensagem de ajuda',
      };

      const { formWrapper } = createComponent(testProps);

      Object.entries(testProps).forEach(([key, value]) => {
        expect(formWrapper().props(key as any)).toBe(value);
      });

      expect(formWrapper().attributes('data-form')).toBe('currency');
    });
  });
});
