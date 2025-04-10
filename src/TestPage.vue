<script setup lang="ts">
import type { ActionButton } from '#ds/index';
import { Page, TextStyle } from '#ds/index';

const action: ActionButton = {
  label: 'Bagy',
};
</script>

<template>
  <Page title="Bagy Design System" size="full" :primary-action="action">
    <TextStyle variant="muted">Inicie seus testes por aqui...</TextStyle>
  </Page>
</template>
