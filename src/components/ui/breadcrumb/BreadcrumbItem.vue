<script setup lang="ts">
defineProps<{
  to: Record<string, unknown>;
}>();
</script>

<template>
  <div class="ui-breadcrumb-item">
    <router-link :to="to" v-if="to">
      <slot />
    </router-link>
    <slot v-else />
  </div>
</template>

<style lang="scss">
@import './BreadCrumbItem.scss';
</style>
