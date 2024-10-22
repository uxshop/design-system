<script setup lang="ts">
import { computed } from 'vue';
import type { TextStyleProps } from './types';

const props = withDefaults(defineProps<TextStyleProps>(), {
  tag: 'span',
});

const textStyleClassList = computed(() => {
  let classes = [props.variant ? `-variant-${props.variant}` : '', props.block ? `-block` : ''];

  return classes;
});
</script>

<template>
  <component :is="tag" class="ui-text-style" :class="textStyleClassList">
    <slot>{{ label }}</slot>
  </component>
</template>

<style lang="scss">
@import './TextStyle.scss';
</style>
