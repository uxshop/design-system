<script setup lang="ts">
import type { IndexTableEmptyMessageProps } from './types';

defineProps<IndexTableEmptyMessageProps>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html  -> Regra desabilitada por não interferir em problemas de XSS -->
  <div class="index-table-empty-message">
    <h4 class="index-table-empty-message-title">Esta seção não possui registros</h4>
    <div v-if="emptyListMessage" class="index-table-empty-message-text" v-html="emptyListMessage" ></div>
  </div>
</template>

<style lang="scss">
.index-table-empty-message {
  padding: var(--s-spacing-small);
  border: var(--s-border-light);
  border-radius: var(--s-border-radius-medium);

  .index-table-empty-message-title {
    margin-bottom: var(--s-spacing-xx-small);
  }
}
</style>
