<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import type { SkeletonProps } from './types';

const props = defineProps<SkeletonProps>();

const skeletonStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.width) {
    styles.width = props.width;
  }
  if (props.height) {
    styles.height = props.height;
  }

  return styles;
});
</script>

<template>
  <div class="ui-skeleton" :style="skeletonStyleList" />
</template>

<style lang="scss">
@import './Skeleton.scss';
</style>
