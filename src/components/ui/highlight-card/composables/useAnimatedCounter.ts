import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import type { HighlightCardProps } from '../types';

/**
 * Composable para animação de contagem de valores
 * @param props - Propriedades do componente HighlightCard
 */
export function useAnimatedCounter(props: HighlightCardProps) {
  const currentValue = ref(0);
  const animationFrameId = ref<number | null>(null);
  const startTime = ref<number | null>(null);
  const animating = ref(false);

  /**
   * Função de animação principal que atualiza o valor da animação
   */
  const animate = () => {
    if (!startTime.value) {
      startTime.value = performance.now();
    }

    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime.value;
    const progress = Math.min(elapsedTime / (props.animationDuration || 3000), 1);

    currentValue.value = progress * (props.value || 0);

    const decimalPlaces = props.animationDecimals || 0;
    currentValue.value = Math.round(currentValue.value * 10 ** decimalPlaces) / 10 ** decimalPlaces;

    if (progress < 1) {
      animationFrameId.value = requestAnimationFrame(animate);

      return;
    }

    currentValue.value = props.value || 0;
    animating.value = false;
  };

  /**
   * Inicia a animação
   */
  const startAnimation = () => {
    stopAnimation();

    animating.value = true;
    startTime.value = null;
    currentValue.value = 0;

    animationFrameId.value = requestAnimationFrame(animate);
  };

  /**
   * Para a animação ou reinicia os valores
   */
  const stopAnimation = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }

    animating.value = false;
  };

  const displayValue = computed(() => {
    if (!props.animationEnabled) {
      return props.valueFormatter?.(props.value || 0);
    }

    return props.valueFormatter?.(currentValue.value);
  });

  watch(() => props.value, startAnimation);
  onMounted(startAnimation);
  onUnmounted(stopAnimation);

  return {
    displayValue,
    animating,
    startAnimation,
    stopAnimation,
  };
}
