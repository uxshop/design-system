import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { Icon, Skeleton } from '#ds/index';
import { VariantStandard } from '#ds/constants';
import HighlightCard from './HighlightCard.vue';

describe('HighlightCard', () => {
  function createComponent(customProps = {}, mountOptions = {}) {
    const wrapper = mount(HighlightCard, {
      props: {
        label: 'Label de teste',
        icon: 'test-icon',
        value: 100,
        variant: VariantStandard.DEFAULT,
        loading: false,
        ...customProps,
      },
      ...mountOptions,
      global: {
        stubs: {
          Icon: true,
          Skeleton: true,
        },
      },
    });

    return {
      wrapper,
      container: () => wrapper.find('article'),
      iconContainer: () => wrapper.find('.highlight-card-icon-container'),
      infoContainer: () => wrapper.find('.highlight-card-info-container'),
      valueElement: () => wrapper.find('.highlight-card-value'),
      labelElement: () => wrapper.find('.highlight-card-label'),
      skeleton: () => wrapper.findComponent(Skeleton),
      icon: () => wrapper.findComponent(Icon),
    };
  }

  describe('Renderização', () => {
    test('Dado um componente HighlightCard básico, Quando é renderizado, Então deve conter os elementos principais', () => {
      const { wrapper, iconContainer, infoContainer } = createComponent();

      expect(wrapper.exists()).toBe(true);
      expect(iconContainer().exists()).toBe(true);
      expect(infoContainer().exists()).toBe(true);
    });

    test('Dado um componente HighlightCard com valores padrão, Quando é renderizado, Então deve exibir os valores corretamente', () => {
      const { labelElement, valueElement } = createComponent();

      expect(labelElement().text()).toBe('Label de teste');
      expect(valueElement().exists()).toBe(true);
    });

    test('Dado um componente HighlightCard, Quando é renderizado com um variant específico, Então deve aplicar a classe correta', () => {
      const { wrapper } = createComponent({
        variant: VariantStandard.HIGHLIGHT,
      });

      expect(wrapper.classes()).toContain('-highlight');
    });
  });

  describe('Estado de loading', () => {
    test('Dado um componente HighlightCard, Quando loading=true, Então deve exibir o componente Skeleton', () => {
      const { skeleton, valueElement } = createComponent({ loading: true });

      expect(skeleton().exists()).toBe(true);
      expect(valueElement().exists()).toBe(false);
    });

    test('Dado um componente HighlightCard, Quando loading=false, Então deve exibir o valor', () => {
      const { skeleton, valueElement } = createComponent({ loading: false });

      expect(skeleton().exists()).toBe(false);
      expect(valueElement().exists()).toBe(true);
    });
  });

  describe('Ícone', () => {
    test('Dado um componente HighlightCard, Quando é renderizado com um icon, Então deve passar a prop correta para o componente Icon', () => {
      const { icon } = createComponent({ icon: 'test-icon' });

      expect(icon().props('name')).toBe('test-icon');
    });

    test('Dado um componente HighlightCard, Quando é renderizado sem um icon, Então não deve renderizar o componente Icon', () => {
      const { icon } = createComponent({ icon: null });

      expect(icon().exists()).toBe(false);
    });
  });

  describe('Formatação de valor', () => {
    test('Dado um componente HighlightCard, Quando é fornecido um valueFormatter personalizado, Então deve formatar o valor corretamente', () => {
      const valueFormatter = vi.fn((value) => `R$ ${value.toFixed(2)}`);
      const { valueElement } = createComponent({
        value: 100,
        valueFormatter,
      });

      expect(valueFormatter).toHaveBeenCalled();
      expect(valueElement().text()).toContain('R$');
    });
  });

  describe('Slots', () => {
    test('Dado um componente HighlightCard, Quando é fornecido um slot icon personalizado, Então deve renderizar o conteúdo personalizado', () => {
      const { iconContainer } = createComponent(
        {},
        {
          slots: {
            icon: '<div class="custom-icon">Ícone personalizado</div>',
          },
        }
      );

      expect(iconContainer().find('.custom-icon').exists()).toBe(true);
      expect(iconContainer().text()).toBe('Ícone personalizado');
    });

    test('Dado um componente HighlightCard, Quando é fornecido um slot label personalizado, Então deve renderizar o conteúdo personalizado', () => {
      const { labelElement } = createComponent(
        {},
        {
          slots: {
            label: '<span class="custom-label">Label personalizado</span>',
          },
        }
      );

      expect(labelElement().find('.custom-label').exists()).toBe(true);
      expect(labelElement().text()).toBe('Label personalizado');
    });
  });

  describe('Acessibilidade', () => {
    test('Dado um componente HighlightCard, Quando é renderizado, Então deve ter os atributos de acessibilidade corretos', () => {
      const { wrapper } = createComponent();

      expect(wrapper.attributes('tabindex')).toBe('0');
      expect(wrapper.attributes('aria-labelledby')).toContain('Label de teste');
    });
  });

  describe('Variantes', () => {
    test.each([
      [VariantStandard.DEFAULT, '-default'],
      [VariantStandard.HIGHLIGHT, '-highlight'],
      [VariantStandard.SUCCESS, '-success'],
      [VariantStandard.WARNING, '-warning'],
      [VariantStandard.CRITICAL, '-critical'],
    ])(
      'Dado um HighlightCard com variant %s, Quando renderizado, Então deve aplicar a classe %s',
      (variant, expectedClass) => {
        const { wrapper } = createComponent({ variant });
        expect(wrapper.classes()).toContain(expectedClass);
      }
    );
  });
});
