import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import FormWrapper from './FormWrapper.vue';

describe('FormWrapper (Teste Integrado)', () => {
  let wrapper: VueWrapper;
  function createComponent(customProps = {}, slots = {}) {
    const props = {
      modelValue: '',
      'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      label: 'Campo de texto',
    };

    Object.assign(props, customProps);

    wrapper = mount(FormWrapper, {
      props,
      slots: {
        default: '<input class="form-control" v-model="modelValue" />',
        ...slots,
      },
      global: {
        // Stub apenas dos componentes de UI que não são foco do teste
        stubs: {
          Icon: true,
          Spinner: true,
        },
      },
    });

    return {
      wrapper,
      getLabel: () => wrapper.find('.form-control-label'),
      getHelpFeedback: () => wrapper.find('.form-help-feedback'),
      getInvalidFeedback: () => wrapper.find('.form-invalid-feedback'),
    };
  }

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Renderização', () => {
    test('Dado um componente FormWrapper básico, Quando é renderizado, Então deve exibir o label corretamente', () => {
      const { getLabel } = createComponent({ label: 'Meu Label' });

      expect(getLabel().text()).toBe('Meu Label');
    });

    test('Dado um componente FormWrapper com ícones, Quando é renderizado, Então deve exibir os ícones', () => {
      const { wrapper } = createComponent({
        leadingIcon: 'user',
        trailingIcon: 'search',
      });

      expect(wrapper.find('.leading-icon').exists()).toBe(true);
      expect(wrapper.find('.trailing-icon').exists()).toBe(true);
    });
  });

  describe('Estados visuais', () => {
    test('Dado um componente FormWrapper, Quando o estado é válido, Então deve ter a classe "-valid"', async () => {
      const { wrapper } = createComponent({ maxlength: undefined, state: true });

      expect(wrapper.classes()).toContain('-valid');
    });

    test('Dado um componente FormWrapper, Quando o estado é inválido, Então deve ter a classe "-invalid"', async () => {
      const { wrapper } = createComponent({
        maxlength: undefined,
        state: false,
      });

      await nextTick();

      expect(wrapper.classes()).toContain('-invalid');
    });

    test('Dado um componente FormWrapper, Quando está desabilitado, Então deve ter a classe "-disabled"', () => {
      const { wrapper } = createComponent({ disabled: true });

      expect(wrapper.classes()).toContain('-disabled');
    });

    test('Dado um componente FormWrapper, Quando está carregando, Então deve mostrar o spinner', () => {
      const { wrapper } = createComponent({ loading: true });

      expect(wrapper.find('.form-control-loader').exists()).toBe(true);
    });
  });

  describe('Mensagens de feedback', () => {
    test('Dado um componente FormWrapper com estado inválido, Quando tem invalidFeedback, Então deve exibir a mensagem de erro', () => {
      const { getInvalidFeedback } = createComponent({
        state: false,
        invalidFeedback: 'Campo inválido',
      });

      expect(getInvalidFeedback().text()).toBe('Campo inválido');
    });

    test('Dado um componente FormWrapper sem estado definido, Quando tem helpFeedback, Então deve exibir a mensagem de ajuda', () => {
      const { getHelpFeedback } = createComponent({
        helpFeedback: 'Texto de ajuda para o campo',
      });

      expect(getHelpFeedback().text()).toContain('Texto de ajuda para o campo');
    });
  });

  describe('Comportamento de flutuação do label', () => {
    test('Dado um componente FormWrapper com float ativado, Quando renderizado, Então o label deve estar dentro do campo', () => {
      const { wrapper } = createComponent({ float: true, label: 'Label Flutuante' });

      expect(wrapper.find('.form-wrapper-notched-label').exists()).toBe(true);
      expect(wrapper.find('.form-wrapper-notched-label').text()).toBe('Label Flutuante');
    });

    test('Dado um componente FormWrapper sem float ativado, Quando renderizado, Então o label deve estar acima do campo', () => {
      const { wrapper } = createComponent({ float: false, label: 'Label Padrão' });

      expect(wrapper.find('.form-wrapper-label').exists()).toBe(true);
      expect(wrapper.find('.form-wrapper-notched-label').exists()).toBe(false);
    });
  });

  describe('Contador de caracteres (integração com useCharacterCount)', () => {
    test('Dado um componente FormWrapper com maxlength, Quando o modelo tem valor vazio, Então deve mostrar a mensagem inicial do contador', async () => {
      const { getHelpFeedback } = createComponent(
        {
          maxlength: 20,
        },
        {
          default:
            '<input class="form-control" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
        }
      );
      await nextTick();

      expect(getHelpFeedback().text()).toContain('Você pode digitar até 20 caracteres');
    });

    test('Dado um componente FormWrapper com maxlength, Quando o texto é digitado, Então deve atualizar o contador de caracteres', async () => {
      const { wrapper, getHelpFeedback } = createComponent({
        maxlength: 20,
      });

      wrapper.setProps({ modelValue: 'Texto de teste' });
      await nextTick();

      expect(getHelpFeedback().text()).toContain('Você tem 6 caracteres restantes');
    });

    test('Dado um componente FormWrapper com maxlength, Quando o texto excede o limite e allowExceedMaxLength é false, Então deve mostrar feedback de erro', async () => {
      const { wrapper, getInvalidFeedback } = createComponent({
        maxlength: 10,
        allowExceedMaxLength: false,
      });

      wrapper.setProps({ modelValue: 'Este texto tem mais de 10 caracteres' });
      await nextTick();

      expect(getInvalidFeedback().exists()).toBe(true);
      expect(getInvalidFeedback().text()).toContain('Você excedeu o limite');
      expect(wrapper.classes()).toContain('-invalid');
    });

    test('Dado um componente FormWrapper com maxlength, Quando o texto excede o limite e allowExceedMaxLength é true, Então deve mostrar feedback de erro', async () => {
      const { wrapper, getInvalidFeedback, getHelpFeedback } = createComponent({
        maxlength: 10,
        allowExceedMaxLength: true,
      });

      wrapper.setProps({ modelValue: 'Este texto tem mais de 10 caracteres' });
      await nextTick();

      expect(getInvalidFeedback().exists()).toBe(true);
      expect(getHelpFeedback().exists()).toBe(false);
      expect(wrapper.classes()).toContain('-invalid');
    });
  });

  describe('Eventos', () => {
    test('Dado um componente FormWrapper, Quando o estado interno muda, Então deve emitir o evento internal-state', async () => {
      const { wrapper } = createComponent({
        maxlength: 10,
        allowExceedMaxLength: false,
      });

      wrapper.setProps({ modelValue: 'Este texto excede o limite' });
      await nextTick();

      expect(wrapper.emitted('internal-state')).toBeTruthy();
      expect(wrapper.emitted('internal-state')?.[0]).toEqual([false]);
    });
  });

  describe('Textos personalizados do contador', () => {
    test('Dado um componente FormWrapper com textsCounter personalizado, Quando renderizado com valor, Então deve usar os textos personalizados', async () => {
      const { getHelpFeedback } = createComponent({
        maxlength: 10,
        modelValue: 'abc',
        textsCounter: {
          counterRemaining: 'Ainda {{amount}} {{element}} {{remaining}}',
          wordElement: {
            singular: 'caractere',
            plural: 'caracteres',
          },
          wordRemaining: {
            singular: 'disponível',
            plural: 'disponíveis',
          },
        },
      });

      await nextTick();
      expect(getHelpFeedback().text()).toContain('Ainda 7 caracteres disponíveis');
    });
  });
});
