<script setup lang="ts">
import type { TableRowProps } from './types';

const props = defineProps<TableRowProps>();

const getComponent = () => {
  return !props.to ? 'div' : 'router-link';
};
</script>

<template>
  <component :is="getComponent()" class="ui-table-row" :to="to" :class="{ '-head': head }">
    <slot />
  </component>
</template>
