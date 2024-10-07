<script setup lang="ts">
import Icon from '../icon/Icon.vue';

defineProps<{ name: string; description?: string; icon?: string }>();
</script>

<template>
  <div class="select-item-card-container">
    <div class="info-container">
      <slot name="leftImage"> </slot>
      <div v-if="!!icon" class="icon-container">
        <Icon :name="icon" />
      </div>
      <div class="content-container">
        <p class="name">{{ name }}</p>
        <small class="description">{{ description }}</small>
      </div>
    </div>
    <Icon name="chevron_right" />
  </div>
</template>

<style lang="scss">
@import './SelectItemCard.scss';
</style>
