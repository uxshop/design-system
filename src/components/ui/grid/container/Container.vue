<script setup lang="ts">
import { shallowRef } from 'vue';
const classList = shallowRef(['container']);
</script>

<template>
  <div :class="classList">
    <slot />
  </div>
</template>

<style lang="scss">
@import '../../../../scss/mixins.scss';

.container {
  @include container;
}
</style>
