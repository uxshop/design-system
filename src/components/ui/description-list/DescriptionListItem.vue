<script setup lang="ts">
import type { DescriptionListItemProps } from './types';

defineProps<DescriptionListItemProps>();
</script>

<template>
  <div class="ui-description-list-item">
    <div class="ui-description-list-item-label">
      {{ label }}
    </div>
    <div v-if="$slots.default" class="ui-description-list-item-description">
      <slot>{{ description }}</slot>
    </div>
  </div>
</template>
