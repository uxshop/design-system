import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { useAnimatedCounter } from './useAnimatedCounter';
import { nextTick, ref } from 'vue';
import type { HighlightCardProps } from '../types';

describe('useAnimatedCounter', () => {
  const setupTestEnv = () => {
    const originalRAF = window.requestAnimationFrame;
    const originalCAF = window.cancelAnimationFrame;
    const originalNow = performance.now;

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      window.requestAnimationFrame = originalRAF;
      window.cancelAnimationFrame = originalCAF;
      performance.now = originalNow;
      vi.useRealTimers();
      vi.restoreAllMocks();
    });
  };
  setupTestEnv();

  const factorySut = (customProps?: Partial<HighlightCardProps>) => {
    const defaultProps: HighlightCardProps = {
      label: 'Test Label',
      value: 100,
      animationEnabled: true,
      animationDuration: 1000,
      animationDecimals: 0,
      valueFormatter: (val: number) => val.toString(),
      ...customProps,
    };

    return {
      props: defaultProps,
      ...useAnimatedCounter(defaultProps),
    };
  };

  test('Dado um composable useAnimatedCounter, Quando animationEnabled é false, Então deve exibir o valor final imediatamente', async () => {
    const { displayValue } = factorySut({
      animationEnabled: false,
    });

    await nextTick();

    expect(displayValue.value).toBe('100');
  });

  test('Dado um composable useAnimatedCounter, Quando um valueFormatter personalizado é fornecido, Então deve formatar o valor corretamente', async () => {
    const { displayValue } = factorySut({
      animationEnabled: false,
      valueFormatter: (val: number) => `R$ ${val.toFixed(2)}`,
    });

    await nextTick();

    expect(displayValue.value).toBe('R$ 100.00');
  });

  test('Dado um composable useAnimatedCounter, Quando props.value é undefined, Então deve usar zero como valor padrão', async () => {
    const { displayValue } = factorySut({
      animationEnabled: false,
      value: undefined,
      valueFormatter: (val) => `${val}%`,
    });

    await nextTick();
    expect(displayValue.value).toBe('0%');
  });

  test('Dado um composable useAnimatedCounter, Quando o valor muda, Então a animação deve reiniciar', async () => {
    const props = ref<HighlightCardProps>({
      label: 'Test Label',
      value: 100,
      animationEnabled: false,
      valueFormatter: (val: number) => val.toString(),
    });

    const { displayValue } = useAnimatedCounter(props.value);
    await nextTick();

    expect(displayValue.value).toBe('100');

    props.value.value = 200;
    await nextTick();

    expect(displayValue.value).toBe('200');
  });

  test('Dado um composable useAnimatedCounter, Quando ocorre alteração no estado de loading, Então o valor deve ser renderizado corretamente', async () => {
    const props: HighlightCardProps = {
      label: 'Test Label',
      value: 100,
      loading: true,
      animationEnabled: false,
      valueFormatter: (val: number) => val.toString(),
    };

    const { displayValue } = useAnimatedCounter(props);

    await nextTick();
    expect(displayValue.value).toBe('100');

    props.loading = false;

    await nextTick();
    expect(displayValue.value).toBe('100');
  });

  test('Dado um composable useAnimatedCounter, Quando métodos de controle são chamados, Então não devem quebrar', async () => {
    const { startAnimation, stopAnimation } = factorySut();

    expect(typeof startAnimation).toBe('function');
    expect(typeof stopAnimation).toBe('function');

    expect(() => {
      startAnimation();
      stopAnimation();
    }).not.toThrow();
  });

  test('Dado um composable useAnimatedCounter com valores negativos, Quando é renderizado, Então deve lidar corretamente com valores negativos', async () => {
    const { displayValue } = factorySut({
      animationEnabled: false,
      value: -100,
      valueFormatter: (val: number) => val.toString(),
    });

    await nextTick();
    expect(displayValue.value).toBe('-100');
  });
});
