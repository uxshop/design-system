<script setup lang="ts">
import { VariantStandard } from '#ds/constants';
import { computed, type StyleValue } from 'vue';
import type { SpinnerProps } from './types';

const props = withDefaults(defineProps<SpinnerProps>(), {
  border: 3,
  size: 22,
  variant: VariantStandard.DEFAULT,
});

const spinnerClassList = computed(() => {
  const classes = [];

  if (props.variant) {
    classes.push(`-variant-${props.variant}`);
  }

  return classes;
});

const spinnerStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.border) {
    styles.borderWidth = props.border + 'px';
  }

  if (props.color) {
    styles.color = props.color;
  }

  if (props.size) {
    styles.width = props.size + 'px';
  }

  return styles;
});
</script>

<template>
  <div class="ui-spinner" :class="spinnerClassList" :style="spinnerStyleList" />
</template>

<style lang="scss">
.ui-spinner {
  display: inline-block;
  vertical-align: text-bottom;
  border-style: solid;
  border-color: currentColor;
  border-right-color: transparent;
  border-radius: var(--s-border-radius-pill);
  -webkit-animation: spinnerBorderer var(--s-motion-duration-moderate) var(--s-motion-ease-linear) infinite;
  animation: spinnerBorderer var(--s-motion-duration-moderate) var(--s-motion-ease-linear) infinite;
  aspect-ratio: 1;

  &.-variant {
    &-default {
      color: var(--s-color-fill-content-default);
    }

    &-highlight {
      color: var(--s-color-fill-highlight);
    }

    &-warning {
      color: var(--s-color-fill-warning);
    }

    &-success {
      color: var(--s-color-fill-success);
    }

    &-critical {
      color: var(--s-color-fill-critical);
    }
  }
}
@keyframes spinnerBorderer {
  to {
    transform: rotate(360deg);
  }
}
</style>
