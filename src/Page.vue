<script setup lang="ts">
import Page from './components/admin/page/Page.vue';
import type { IAction } from './types';

const action: IAction = {
  label: 'Bagy',
};
</script>

<template>
  <Page title="Bagy Design System" size="full" :primary-action="action">
    <TextStyle variant="muted">Inicie seus testes por aqui hahahahah...</TextStyle>
  </Page>
</template>
