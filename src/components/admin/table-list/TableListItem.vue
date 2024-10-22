<script setup lang="ts">
import { ref } from 'vue';
import type { TableListItemProps } from './types';

const props = defineProps<TableListItemProps>();

const classList = ref<string[]>([]);

if (props.auto) {
  classList.value.push('-auto');
}
if (props.nowrap) {
  classList.value.push('-nowrap');
}
</script>

<template>
  <div class="table-list-item" :class="classList">
    <slot />
  </div>
</template>
