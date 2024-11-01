<script setup lang="ts">
import type { IndexTablePaginationItemEmits, IndexTablePaginationItemProps } from './types';
import IconButton from '../icon-button/IconButton.vue';

withDefaults(defineProps<IndexTablePaginationItemProps>(), {
  from: 0,
  to: 0,
  total: 0,
  page: 1,
});
const emit = defineEmits<IndexTablePaginationItemEmits>();
</script>

<template>
  <div class="index-table-pagination">
    <div v-show="from" class="index-table-pagination-item">{{ from }} – {{ to }} {{ total ? 'de ' + total : '' }}</div>

    <IconButton size="md" icon="arrow_back" :disabled="1 === page" @click="emit('previous-page')" />

    <IconButton size="md" icon="arrow_forward" :disabled="to === total" @click="emit('next-page')" />
  </div>
</template>

<style lang="scss" scoped>
@import './IndexTablePaginationItem.scss';
</style>
