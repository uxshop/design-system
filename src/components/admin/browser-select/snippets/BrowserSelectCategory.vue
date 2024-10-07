<script setup lang="ts">
import BrowserSelectCell from './BrowserSelectCell.vue';

defineProps<{
  item: {
    id: number;
    name: string;
    breadcrumb: string;
  };
}>();
</script>

<template>
  <BrowserSelectCell>
    {{ item.name }}
    <small class="d-block" v-if="item.breadcrumb.indexOf('>') !== -1">
      {{ item.breadcrumb }}
    </small>
  </BrowserSelectCell>
</template>
