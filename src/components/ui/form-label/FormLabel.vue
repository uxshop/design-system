<script setup lang="ts">
import type { FormLabelProps } from './types';

defineProps<FormLabelProps>();
</script>

<template>
  <label class="form-control-label" style="display: block">
    <slot>{{ label }}</slot>
  </label>
</template>
