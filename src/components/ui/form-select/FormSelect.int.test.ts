import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import type { FormWrapperDefaultProps } from '../form-wrapper/types';
import FormSelect from './FormSelect.vue';

describe('FormSelect', () => {
  function createComponent(customProps = {}, mountOptions = {}) {
    const wrapper = mount(FormSelect, {
      props: {
        modelValue: '',
        placeholder: 'Selecione uma opção',
        options: [
          { label: 'Opção 1', value: '1' },
          { label: 'Opção 2', value: '2' },
          { label: 'Opção 3', value: '3' },
        ],
        ...customProps,
      },
      ...mountOptions,
      stubs: {
        FormWrapper: true,
      },
    });

    return {
      wrapper,
      select: () => wrapper.find('select'),
      formWrapper: () => wrapper.findComponent(FormWrapper),
    };
  }

  describe('Renderização', () => {
    test('Dado um componente FormSelect básico, Quando é renderizado, Então deve conter um elemento select', () => {
      const { select } = createComponent();

      expect(select().exists()).toBe(true);
    });

    test('Dado um componente FormSelect com placeholder, Quando é renderizado, Então deve incluir uma opção placeholder', () => {
      const placeholder = 'Teste placeholder';
      const { wrapper } = createComponent({ placeholder });

      const placeholderOption = wrapper.find('option[value=""][selected][disabled]');
      expect(placeholderOption.exists()).toBe(true);
      expect(placeholderOption.text()).toBe(placeholder);
    });

    test('Dado um componente FormSelect com options, Quando é renderizado, Então deve renderizar todas as opções', () => {
      const options = [
        { label: 'Teste 1', value: '1' },
        { label: 'Teste 2', value: '2' },
        { label: 'Teste 3', value: '3' },
      ];
      const { wrapper } = createComponent({ options });

      const optionElements = wrapper.findAll('option:not([value=""][selected][disabled])');
      expect(optionElements.length).toBe(options.length);
      options.forEach((option, index) => {
        expect(optionElements[index].text()).toBe(option.label);
      });
    });
  });

  describe('Eventos', () => {
    test('Dado um componente FormSelect, Quando uma opção é selecionada, Então deve emitir o evento update:modelValue', async () => {
      const { select, wrapper } = createComponent();

      await select().setValue('1');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1']);
    });

    test('Dado um componente FormSelect, Quando uma opção é selecionada, Então deve emitir o evento update', async () => {
      const { select, wrapper } = createComponent();

      await select().setValue('1');

      expect(wrapper.emitted('update')).toBeTruthy();
      expect(wrapper.emitted('update')?.[0]).toEqual(['1']);
    });
  });

  describe('Estado de input', () => {
    test('Dado um componente FormSelect, Quando está disabled, Então o select deve estar desabilitado', () => {
      const { select } = createComponent({ disabled: true });

      expect(select().attributes('disabled')).toBeDefined();
    });

    test('Dado um componente FormSelect, Quando está readonly, Então o select deve ter o atributo readonly', () => {
      const { select } = createComponent({ readonly: true });

      expect(select().attributes('readonly')).toBeDefined();
    });

    test('Dado um componente FormSelect, Quando está required, Então o select deve ter o atributo required', () => {
      const { select } = createComponent({ required: true });

      expect(select().attributes('required')).toBeDefined();
    });
  });

  describe('Integração com FormWrapper', () => {
    test('Dado um componente FormSelect, Quando eventos internos são emitidos do FormWrapper, Então deve propagar corretamente', async () => {
      const { wrapper, formWrapper } = createComponent();

      await formWrapper().vm.$emit('internal-state', false);

      expect(wrapper.emitted('internal-state')).toBeTruthy();
      expect(wrapper.emitted('internal-state')?.[0]).toEqual([false]);
    });

    test('Dado um componente FormSelect com label, Quando é renderizado, Então deve passar o label para FormWrapper', () => {
      const label = 'Selecione uma opção';
      const { formWrapper } = createComponent({ label });

      expect(formWrapper().props('label')).toBe(label);
    });

    test('Dado um componente FormSelect com invalidFeedback, Quando é renderizado, Então deve passar o invalidFeedback para FormWrapper', () => {
      const invalidFeedback = 'Seleção inválida';
      const { formWrapper } = createComponent({ invalidFeedback, state: false });

      expect(formWrapper().props('invalidFeedback')).toBe(invalidFeedback);
    });

    test('Dado um componente FormSelect com helpFeedback, Quando é renderizado, Então deve passar o helpFeedback para FormWrapper', () => {
      const helpFeedback = 'Selecione uma das opções disponíveis';
      const { formWrapper } = createComponent({ helpFeedback });

      expect(formWrapper().props('helpFeedback')).toBe(helpFeedback);
    });

    test('Dado um componente FormSelect, Quando é renderizado, Então deve passar todas as props necessárias para FormWrapper', () => {
      const testProps: Required<FormWrapperDefaultProps> = {
        id: 'test-id',
        leadingIcon: 'list',
        trailingIcon: 'arrow-down',
        trailingText: 'Opções',
        label: 'Selecione uma opção',
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

      expect(formWrapper().attributes('class')).toContain('ui-form-select');
    });
  });
});
