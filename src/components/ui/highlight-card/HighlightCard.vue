<script setup lang="ts">
import { VariantStandard } from '#ds/constants';
import vTooltip from '../../../directives/tooltip';
import { Icon, Skeleton } from '#ds/index';
import { withDefaults } from 'vue';
import type { HighlightCardProps, HighlightCardSlots } from './types';
import { useAnimatedCounter } from './composables/useAnimatedCounter';

const props = withDefaults(defineProps<HighlightCardProps>(), {
  value: 0,
  variant: VariantStandard.DEFAULT,
  loading: false,
  icon: 'adjust',
  animationEnabled: true,
  animationDuration: 1500,
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
        <slot name="value" :display-value="displayValue">
          {{ displayValue }}
        </slot>
      </p>

      <Skeleton v-if="loading" class="highlight-card-label-skeleton" />
      <p v-else :id="`${uid}-${label}`" class="highlight-card-label">
        <slot name="label" :label="label" :label-info="labelInfo">
          {{ label }}
          <span v-if="labelInfo" v-tooltip:top="labelInfo" class="highlight-card-tooltip">
            <Icon name="help" size="16" />
          </span>
        </slot>
      </p>
    </div>
  </article>
</template>

<style lang="scss">
@use 'HighlightCard.scss';
</style>
