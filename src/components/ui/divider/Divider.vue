<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import type { DividerProps } from './types';

const props = withDefaults(defineProps<DividerProps>(), {
  height: '2px',
});

const dividerClassList = computed(() => {
  let classes = [];

  if (props.transparent) {
    classes.push('-transparent');
  }

  return classes;
});

const dividerStyleList = computed(() => {
  let styles: StyleValue = {};

  if (props.margin) {
    styles.marginBottom = props.margin;
    styles.marginTop = props.margin;
  }

  if (props.height) {
    styles.height = props.height;
  }

  return styles;
});
</script>

<template>
  <hr class="ui-divider" :class="dividerClassList" :style="dividerStyleList" />
</template>

<style lang="scss">
@import './Divider.scss';
</style>
