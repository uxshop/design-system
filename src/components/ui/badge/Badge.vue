<script setup lang="ts">
import { VariantStandard } from '#ds/constants';
import { computed } from 'vue';
import type { BadgeProps } from './types';

const props = withDefaults(defineProps<BadgeProps>(), {
  size: 'md',
  variant: VariantStandard.DEFAULT,
});

const badgeClassList = computed(() => {
  const badgeClasses = [
    props.pill && '-pill',
    props.size && `-size-${props.size}`,
    props.variant && `-variant-${props.variant}`,
    props.noWrap && '-no-wrap',
  ];

  return badgeClasses.filter((badgeClass) => badgeClass);
});
</script>

<template>
  <span class="ui-badge" :class="badgeClassList">
    <slot>{{ label }}</slot>
  </span>
</template>

<style lang="scss">
@use 'Badge.scss';
</style>
