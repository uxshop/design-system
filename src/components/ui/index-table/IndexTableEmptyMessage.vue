<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import type { IndexTableEmptyMessageEmits } from './types';

const emit = defineEmits<IndexTableEmptyMessageEmits>();
</script>

<template>
  <div class="index-table-empty-msg">
    <div class="index-table-empty-msg-content">
      <div class="index-table-empty-msg-icon">
        <Icon name="search" size="40" />
      </div>
      <div class="index-table-empty-msg-title">Sua pesquisa não retornou nenhum resultado</div>
      <div class="index-table-empty-msg-text">
        Essa opção não existe na sua loja, tente
        <a @click="emit('reset-filters')">outra opção de filtro</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './IndexTableEmptyMessage.scss';
</style>
