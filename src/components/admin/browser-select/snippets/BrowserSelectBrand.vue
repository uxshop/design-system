<script setup lang="ts">
import BrowserSelectCell from './BrowserSelectCell.vue';
import Image from '../../../ui/image/Image.vue';

defineProps<{
  item: Record<string, never | Record<string, never>>;
}>();
</script>

<template>
  <BrowserSelectCell>
    <Image size="40" :src="item.image?.src" />
  </BrowserSelectCell>
  <BrowserSelectCell>
    {{ item.name }}
  </BrowserSelectCell>
</template>
