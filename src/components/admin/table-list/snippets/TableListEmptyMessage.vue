<script setup lang="ts">
import type { TableListEmptyMessageProps } from '../types';

defineProps<TableListEmptyMessageProps>();
</script>

<template>
  <div class="table-list-empty-message">
    <h4 class="table-list-empty-message-title">Esta seção não possui registros</h4>
    <div v-if="msg" v-html="msg" class="table-list-empty-message-text"></div>
  </div>
</template>

<style lang="scss">
.table-list-empty-message {
  padding: var(--s-spacing-small);
  border: var(--s-border-light);
  border-radius: var(--s-border-radius-medium);
  .table-list-empty-message-title {
    margin-bottom: var(--s-spacing-xx-small);
  }
}
</style>
