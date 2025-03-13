import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import FormWrapper from '../form-wrapper/FormWrapper.vue';
import FormTextfield from './FormTextfield.vue';

describe('FormTextfield', () => {
  function createComponent(customProps = {}, mountOptions = {}) {
    const wrapper = mount(FormTextfield, {
      props: {
        modelValue: 'initialText',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
        type: 'text',
        placeholder: 'Digite aqui',
        maxlength: 100,
        allowExceedMaxLength: false,
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
    test('Dado um componente FormTextfield básico, Quando é renderizado, Então deve conter um elemento input', () => {
      const { input } = createComponent();

      expect(input().exists()).toBe(true);
    });

    test('Dado um componente FormTextfield com placeholder, Quando é renderizado, Então o input deve ter o placeholder correto', () => {
      const placeholder = 'Teste placeholder';
      const { input } = createComponent({ placeholder });

      expect(input().attributes('placeholder')).toBe(placeholder);
    });

    test('Dado um componente FormTextfield com maxlength, Quando é renderizado, Então o input deve ter o maxlength correto', () => {
      const maxlength = 50;
      const { input } = createComponent({ maxlength, allowExceedMaxLength: false });

      expect(input().attributes('maxlength')).toBe(String(maxlength));
    });
  });

  describe('Manipulação de v-model', () => {
    test('Dado um componente FormTextfield com v-model, Quando o valor do input é alterado, Então o v-model deve ser atualizado', async () => {
      const wrapper = mount({
        components: { FormTextfield },
        template: '<FormTextfield v-model="text" />',
        data() {
          return {
            text: '',
          };
        },
      });

      const input = wrapper.find('input');
      await input.setValue('Novo valor');

      expect(wrapper.vm.text).toBe('Novo valor');
    });
  });

  describe('Eventos', () => {
    test('Dado um componente FormTextfield, Quando o input recebe foco, Então deve emitir o evento focus', async () => {
      const { input, wrapper } = createComponent();
      await input().trigger('focus');
      expect(wrapper.emitted().focus).toBeTruthy();
    });

    test('Dado um componente FormTextfield, Quando o input perde o foco, Então deve emitir o evento blur', async () => {
      const { input, wrapper } = createComponent();
      await input().trigger('blur');
      expect(wrapper.emitted().blur).toBeTruthy();
    });

    test('Dado um componente FormTextfield, Quando uma tecla é pressionada, Então deve emitir o evento keydown', async () => {
      const { input, wrapper } = createComponent();
      await input().trigger('keydown');
      expect(wrapper.emitted().keydown).toBeTruthy();
    });

    test('Dado um componente FormTextfield, Quando a tecla Enter é pressionada, Então deve emitir o evento keydownEnter', async () => {
      const { input, wrapper } = createComponent();
      await input().trigger('keydown.enter');
      expect(wrapper.emitted().keydownEnter).toBeTruthy();
    });
  });

  describe('Contagem de caracteres', () => {
    test('Dado um campo com limite de 10 caracteres, Quando o usuário digita mais que o permitido e allowExceedMaxLength é false, Então o input não irá limitar a entrada', async () => {
      const { input } = createComponent({ maxlength: 10, allowExceedMaxLength: false });
      await input().setValue('12345678901');

      expect(input().element.value.length).toBe(11);
    });

    test('Dado um campo com limite de 10 caracteres, Quando o usuário digita mais que o permitido e allowExceedMaxLength é true, Então o input deve permitir a entrada excedente', async () => {
      const { input } = createComponent({ maxlength: 10, allowExceedMaxLength: true });

      expect(input().attributes('maxlength')).toBeUndefined();
    });
  });

  describe('Contador de caracteres com showCounter', () => {
    test('Dado um componente FormTextfield com showCounter=false, Quando é renderizado, Então não deve passar showCounter=false para FormWrapper', () => {
      const { formWrapper } = createComponent({
        maxlength: 100,
        showCounter: false,
      });

      expect(formWrapper().props('showCounter')).toBe(false);
    });

    test('Dado um componente FormTextfield com showCounter=true, Quando é renderizado, Então deve passar showCounter=true para FormWrapper', () => {
      const { formWrapper } = createComponent({
        maxlength: 100,
        showCounter: true,
      });

      expect(formWrapper().props('showCounter')).toBe(true);
    });
  });

  describe('Estado de input', () => {
    test('Dado um componente FormTextfield, Quando está disabled, Então o input deve estar desabilitado', () => {
      const { input } = createComponent({ disabled: true });
      expect(input().attributes('disabled')).toBeDefined();
    });

    test('Dado um componente FormTextfield, Quando está readonly, Então o input deve ter o atributo readonly', () => {
      const { input } = createComponent({ readonly: true });
      expect(input().attributes('readonly')).toBeDefined();
    });

    test('Dado um componente FormTextfield, Quando está required, Então o input deve ter o atributo required', () => {
      const { input } = createComponent({ required: true });
      expect(input().attributes('required')).toBeDefined();
    });
  });

  describe('Botão de limpar', () => {
    test('Dado um componente FormTextfield com clearable, Quando o input contém valor, Então deve exibir o botão de limpar', async () => {
      const { wrapper } = createComponent({ clearable: true });

      await wrapper.setProps({ modelValue: 'valor' });

      expect(wrapper.find('.close').exists()).toBe(true);
    });

    test('Dado um componente FormTextfield com clearable e valor, Quando o botão de limpar é clicado, Então deve limpar o valor', async () => {
      const wrapper = mount({
        components: { FormTextfield },
        template: '<FormTextfield v-model="text" clearable />',
        data() {
          return {
            text: 'valor inicial',
          };
        },
      });
      await nextTick();
      const clearButton = wrapper.find('.close');

      await clearButton.trigger('click');

      expect(wrapper.vm.text).toBeNull();
    });
  });

  describe('Integração com FormWrapper', () => {
    test('Dado um componente FormTextfield, Quando eventos internos são emitidos do FormWrapper, Então deve propagar corretamente', async () => {
      const { wrapper, formWrapper } = createComponent();

      await formWrapper().vm.$emit('internal-state', false);

      expect(wrapper.emitted('internal-state')).toBeTruthy();
      expect(wrapper.emitted('internal-state')?.[0]).toEqual([false]);
    });
  });
});
