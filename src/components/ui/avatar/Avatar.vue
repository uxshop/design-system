<script setup lang="ts">
import { ref } from 'vue';
import type { AvatarProps } from './types';

const props = defineProps<AvatarProps>();

const classList = ref<string[]>([]);

const style = ref<{
  width?: string;
  height?: string;
  fontSize?: string | number;
}>({});

if (props.size) {
  style.value.width = `${props.size}px`;
  style.value.height = `${props.size}px`;
  style.value.fontSize = `${Number(props.size) * 0.33}px`;
}

if (props.variant) {
  classList.value.push(`-${props.variant}`);
}
</script>

<template>
  <div class="ui-avatar" :class="classList" :style="style">
    <div class="ui-avatar-content">
      <img :src="src" v-if="src" />
      <slot v-else>
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './Avatar.scss';
</style>
