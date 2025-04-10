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
      showCounter: true,
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
      getHelpFeedback: () => wrapper.find('[data-form="help-feedback"]'),
      getInvalidFeedback: () => wrapper.find('[data-form="invalid-feedback"]'),
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

  describe('Contador de caracteres com prop showCounter', () => {
    test('Quando showCounter é true e maxlength está definido, Então deve mostrar o contador de caracteres', async () => {
      const { getHelpFeedback } = createComponent({
        maxlength: 20,
        showCounter: true,
      });

      await nextTick();

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('Você pode digitar até 20 caracteres');
    });

    test('Quando showCounter é false e maxlength está definido, Então não deve mostrar o contador de caracteres', async () => {
      const { getHelpFeedback } = createComponent({
        maxlength: 20,
        showCounter: false,
      });

      await nextTick();

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('');
    });

    test('Quando showCounter é false, e o `state` é `false` e o texto excede o limite, Então não deve mostrar feedback de erro relacionado ao contador mas o campo terá o estado de erro devido ao `state` passado', async () => {
      const { wrapper, getInvalidFeedback } = createComponent({
        maxlength: 10,
        allowExceedMaxLength: true,
        showCounter: false,
        state: false,
      });

      wrapper.setProps({ modelValue: 'Este texto tem mais de 10 caracteres' });
      await nextTick();

      expect(getInvalidFeedback().exists()).toBe(true);
      expect(getInvalidFeedback().text()).toContain('');
      expect(wrapper.classes()).toContain('-invalid');
    });

    test('Quando showCounter é false mas há invalidFeedback, Então deve mostrar o invalidFeedback independente do contador', async () => {
      const { wrapper, getInvalidFeedback } = createComponent({
        maxlength: 10,
        showCounter: false,
        state: false,
        invalidFeedback: 'Campo com erro personalizado',
      });

      await nextTick();

      expect(getInvalidFeedback().exists()).toBe(true);
      expect(getInvalidFeedback().text()).toBe('Campo com erro personalizado');
      expect(wrapper.classes()).toContain('-invalid');
    });

    test('Quando showCounter é false mas há helpFeedback, Então deve mostrar o helpFeedback independente do contador', async () => {
      const { getHelpFeedback } = createComponent({
        maxlength: 10,
        showCounter: false,
        helpFeedback: 'Texto de ajuda personalizado',
      });

      await nextTick();

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toBe('Texto de ajuda personalizado');
    });

    test('Quando showCounter muda de false para true, Então o texto do contador deve ser exibido', async () => {
      const { wrapper, getHelpFeedback } = createComponent({
        maxlength: 20,
        showCounter: false,
      });

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('');

      wrapper.setProps({ showCounter: true });
      await nextTick();

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('Você pode digitar até 20 caracteres');
    });

    test('Quando showCounter muda de true para false, Então o texto do contador deve ser ocultado', async () => {
      const { wrapper, getHelpFeedback } = createComponent({
        maxlength: 20,
        showCounter: true,
      });

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('Você pode digitar até 20 caracteres');

      wrapper.setProps({ showCounter: false });
      await nextTick();

      expect(getHelpFeedback().exists()).toBe(true);
      expect(getHelpFeedback().text()).toContain('');
    });
  });
});
