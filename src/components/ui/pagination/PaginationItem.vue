<script setup lang="ts">
import type { PaginationItemProps } from './types';

defineProps<PaginationItemProps>();
</script>

<template>
  <div class="ui-pagination-item" :class="{ '-disabled': disabled }">
    <slot />
  </div>
</template>

<style lang="scss">
@import './PaginationItem.scss';
</style>
