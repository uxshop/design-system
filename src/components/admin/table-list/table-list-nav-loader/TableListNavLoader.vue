<script setup lang="ts">
import Spinner from '../../../ui/spinner/Spinner.vue';
import type { TableListNavLoaderProps } from '../types';

defineProps<TableListNavLoaderProps>();
</script>

<template>
  <div class="table-list-loader" :class="{ '-show': loading }">
    <Spinner class="table-list-loader-spinner" size="24" />
    <span>Carregando dados da tabela</span>
  </div>
</template>

<style lang="scss">
@import './TableListNavLoader.scss';
</style>
