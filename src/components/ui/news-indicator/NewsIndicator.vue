<script setup lang="ts">
import Badge from '../badge/Badge.vue';
import type { NewsIndicatorProps } from './types';

defineProps<NewsIndicatorProps>();
</script>

<template>
  <Badge v-if="label" :label="label" variant="highlight" size="sm" />
  <div v-else class="new-indicator"></div>
</template>

<style lang="scss">
@import './NewsIndicator.scss';
</style>
