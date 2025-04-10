import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { FormWrapperDefaultProps } from '../form-wrapper/types';
import IconButton from '../icon-button/IconButton.vue';
import FormDatepicker from './FormDatepicker.vue';

vi.mock('@easepick/bundle', () => ({
  easepick: {
    create: vi.fn(() => ({
      setDateRange: vi.fn(),
      setDate: vi.fn(),
      clear: vi.fn(),
      on: vi.fn(),
    })),
  },
  RangePlugin: {},
}));

describe('FormDatepicker', () => {
  function createComponent(customProps = {}, mountOptions = {}) {
    const wrapper = mount(FormDatepicker, {
      props: {
        modelValue: '',
        placeholder: 'Selecione uma data',
        ...customProps,
      },
      ...mountOptions,
      global: {
        stubs: {
          IconButton: true,
        },
      },
    });

    return {
      wrapper,
      input: () => wrapper.find('[data-form="input"]'),
      formWrapper: () => wrapper.findComponent(FormWrapper),
      iconButton: () => wrapper.find('[data-icon="button"]'),
    };
  }

  describe('Renderização', () => {
    test('Dado um componente FormDatepicker básico, Quando é renderizado, Então deve conter um elemento input', () => {
      const { input } = createComponent({ modelValue: '2023-12-25' });

      expect(input().exists()).toBe(true);
    });

    test('Dado um componente FormDatepicker com placeholder, Quando é renderizado, Então o input deve ter o placeholder correto', () => {
      const placeholder = 'Teste placeholder';
      const { input } = createComponent({ placeholder });

      expect(input().attributes('placeholder')).toBe(placeholder);
    });

    test('Dado um componente FormDatepicker com valor, Quando é renderizado, Então deve mostrar o botão de limpar', () => {
      const { iconButton } = createComponent({ modelValue: '2023-12-25' });

      expect(iconButton().exists()).toBe(true);
      expect(iconButton().attributes('icon')).toBe('close');
    });

    test('Dado um componente FormDatepicker sem valor, Quando é renderizado, Então não deve mostrar o botão de limpar', () => {
      const { wrapper } = createComponent({ modelValue: '' });

      expect(wrapper.findComponent(IconButton).exists()).toBe(false);
    });

    test('Dado um componente FormDatepicker com noClear=true, Quando é renderizado, Então não deve mostrar o botão de limpar mesmo com valor definido', () => {
      const { wrapper } = createComponent({ modelValue: '2023-12-25', noClear: true });

      expect(wrapper.findComponent(IconButton).exists()).toBe(false);
    });
  });

  describe('Estado de input', () => {
    test('Dado um componente FormDatepicker com state=false, Quando é renderizado, Então o input deve ter a classe -invalid', () => {
      const { input } = createComponent({ state: false });

      expect(input().classes()).toContain('-invalid');
    });

    test('Dado um componente FormDatepicker com state=true, Quando é renderizado, Então o input deve ter a classe -valid', () => {
      const { input } = createComponent({ state: true });

      expect(input().classes()).toContain('-valid');
    });

    test('Dado um componente FormDatepicker com range=true, Quando é renderizado, Então o input deve ter a classe -range', () => {
      const { input } = createComponent({ range: true });

      expect(input().classes()).toContain('-range');
    });
  });

  describe('Integração com FormWrapper', () => {
    test('Dado um componente FormDatepicker, Quando eventos internos são emitidos do FormWrapper, Então deve propagar corretamente', async () => {
      const { wrapper, formWrapper } = createComponent();

      await formWrapper().vm.$emit('internal-state', false);

      expect(wrapper.emitted('internal-state')).toBeTruthy();
      expect(wrapper.emitted('internal-state')?.[0]).toEqual([false]);
    });

    test('Dado um componente FormDatepicker com label, Quando é renderizado, Então deve passar o label para FormWrapper', () => {
      const label = 'Data de Nascimento';
      const { formWrapper } = createComponent({ label });

      expect(formWrapper().props('label')).toBe(label);
    });

    test('Dado um componente FormDatepicker com invalidFeedback, Quando é renderizado, Então deve passar o invalidFeedback para FormWrapper', () => {
      const invalidFeedback = 'Data inválida';
      const { formWrapper } = createComponent({ invalidFeedback, state: false });

      expect(formWrapper().props('invalidFeedback')).toBe(invalidFeedback);
    });

    test('Dado um componente FormDatepicker com helpFeedback, Quando é renderizado, Então deve passar o helpFeedback para FormWrapper', () => {
      const helpFeedback = 'Selecione uma data válida';
      const { formWrapper } = createComponent({ helpFeedback });

      expect(formWrapper().props('helpFeedback')).toBe(helpFeedback);
    });

    test('Dado um componente FormDatepicker, Quando é renderizado, Então deve passar todas as props necessárias para FormWrapper', () => {
      const testProps: Required<Omit<FormWrapperDefaultProps, 'id'>> = {
        leadingIcon: 'calendar',
        trailingIcon: 'arrow-down',
        trailingText: 'Data',
        label: 'Selecione uma data',
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
        if (key === 'leadingIcon') return;

        expect(formWrapper().props(key as any)).toBe(value);
      });

      expect(formWrapper().props('leadingIcon')).toBe('event');
      expect(formWrapper().attributes('class')).toContain('ui-form-datepicker');
    });
  });
});
