<script setup lang="ts">
import BrowserSelectCell from './BrowserSelectCell.vue';

defineProps<{
  item: Record<string, unknown>;
}>();
</script>

<template>
  <BrowserSelectCell> {{ item.name }}</BrowserSelectCell>
</template>
