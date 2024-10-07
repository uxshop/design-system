<script setup lang="ts">
import { watchEffect } from 'vue';

const props = defineProps<{
  theme?: 'dark' | 'light';
}>();

watchEffect(() => {
  if (props.theme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});
</script>

<template></template>
