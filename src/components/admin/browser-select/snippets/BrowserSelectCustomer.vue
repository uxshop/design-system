<script setup lang="ts">
import BrowserSelectCell from './BrowserSelectCell.vue';
import Avatar from '../../../ui/avatar/Avatar.vue';

defineProps<{
  item: Record<string, unknown>;
}>();
</script>

<template>
  <BrowserSelectCell>
    <Avatar size="30" />
  </BrowserSelectCell>
  <BrowserSelectCell> {{ item.name }}</BrowserSelectCell>
</template>
