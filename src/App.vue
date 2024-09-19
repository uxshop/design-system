<script setup lang="ts">
import Layout from './components/admin/layout/Layout.vue';
import Page from './components/admin/page/Page.vue';
import TextStyle from './components/ui/text-style/TextStyle.vue';
import type { IAction } from './types';

const action: IAction = {
  label: 'Visitar Bagy',
};
</script>

<template>
  <Page title="Bagy Design System" size="full" :primaryAction="action">
    <TextStyle variant="muted">Inicie seus testes por aqui...</TextStyle>
  </Page>
</template>

<style lang="scss">
@import './scss/theme.scss';
</style>
