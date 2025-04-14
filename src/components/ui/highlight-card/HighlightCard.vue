<script setup lang="ts">
import { VariantStandard } from '#ds/constants';
import { Icon, Skeleton } from '#ds/index';
import { withDefaults } from 'vue';
import type { HighlightCardProps, HighlightCardSlots } from './types';
import { useAnimatedCounter } from './composables/useAnimatedCounter';

const props = withDefaults(defineProps<HighlightCardProps>(), {
  value: 0,
  variant: VariantStandard.DEFAULT,
  loading: false,
  animationEnabled: true,
  animationDuration: 3000,
  animationDecimals: 0,
  valueFormatter: (value: number) => value.toString(),
});
defineSlots<HighlightCardSlots>();

const uid = `ui-highlight-card-${crypto.randomUUID()}`;

const { displayValue } = useAnimatedCounter(props);
</script>

<template>
  <article
    :id="uid"
    :class="{
      [`highlight-card -${variant}`]: true,
      '-is-loading': loading,
    }"
    tabindex="0"
    :aria-labelledby="`${uid}-${label}`">
    <Skeleton v-if="loading" class="highlight-card-icon-container-skeleton" />
    <div v-else class="highlight-card-icon-container">
      <slot name="icon" :variant="variant">
        <Icon v-if="icon" :name="icon" size="16" />
      </slot>
    </div>

    <div class="highlight-card-info-container">
      <Skeleton v-if="loading" class="highlight-card-value-skeleton" />
      <p v-else class="highlight-card-value">
        {{ displayValue }}
      </p>

      <Skeleton v-if="loading" class="highlight-card-label-skeleton" />
      <p v-else :id="`${uid}-${label}`" class="highlight-card-label">
        <slot name="label">
          {{ label }}
        </slot>
      </p>
    </div>
  </article>
</template>

<style lang="scss">
@use 'HighlightCard.scss';
</style>
