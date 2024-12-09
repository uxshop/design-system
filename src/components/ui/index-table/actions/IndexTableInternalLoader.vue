<script setup lang="ts">
import Spinner from '#ds/components/ui/spinner/Spinner.vue';
import type { IndexTableInternalLoaderProps } from '../types';

defineProps<IndexTableInternalLoaderProps>();
</script>

<template>
  <div class="table-list-loader" :class="{ '-show': isInternalLoading }" data-test-index-table="internal-loading">
    <Spinner class="table-list-loader-spinner" size="24" />
    <span>Carregando dados da tabela</span>
  </div>
</template>

<style lang="scss">
@import './IndexTableInternalLoader.scss';
</style>
