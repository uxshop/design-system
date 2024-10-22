<script setup lang="ts">
import { computed, type StyleValue } from 'vue';
import Icon from '../icon/Icon.vue';
import type { ImageProps } from './types';

const props = withDefaults(defineProps<ImageProps>(), {
  size: 50,
});

const imageClassList = computed(() => {
  let classes = [];

  if (!props.src) {
    classes.push('-no-image');
  }

  if (props.rounded) {
    classes.push('-is-rounded');
  }

  return classes;
});

const imageStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.size) {
    styles.width = `${props.size}px`;
  }

  return styles;
});

const iconStyleList = computed(() => {
  const styles: StyleValue = {};

  if (props.size) {
    styles.fontSize = `${Number(props.size) / 2.5}px`;
    styles.width = `${Number(props.size) / 2.5}px`;
    styles.height = `${Number(props.size) / 2.5}px`;
  }

  return styles;
});
</script>

<template>
  <div class="ui-image" :class="imageClassList" :style="imageStyleList">
    <img v-if="props.src" :src="props.src" class="ui-image-content" />
    <Icon v-else name="wallpaper" class="ui-image-icon" :style="iconStyleList" />
  </div>
</template>

<style lang="scss">
@import './Image.scss';
</style>
