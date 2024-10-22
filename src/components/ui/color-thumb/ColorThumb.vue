<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import type { ColorThumbProps } from './types';

const props = withDefaults(defineProps<ColorThumbProps>(), {
  size: 'md',
});

const colorThumbClassList = computed(() => {
  let classes = [];

  if (props.size) {
    classes.push(`-size-${props.size}`);
  }

  return classes;
});

const colorThumbStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.width) {
    styles.width = `${props.width}px`;
  }

  return styles;
});
</script>

<template>
  <span class="ui-color-thumb" :class="colorThumbClassList" :style="colorThumbStyleList">
    <img v-if="image" :src="image" class="ui-color-thumb-image" />
    <template v-else>
      <span class="ui-color-thumb-color" :style="{ backgroundColor: hexadecimal }" />
      <span class="ui-color-thumb-color -secondary" :style="{ backgroundColor: hexadecimalSecondary }" />
    </template>
  </span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
