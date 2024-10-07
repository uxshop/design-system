<script setup lang="ts">
defineEmits(['click']);
defineProps<{
  hover?: boolean;
  noPadding?: boolean;
  tiny?: boolean;
}>();
</script>
<template>
  <div class="table-responsive">
    <div class="ui-table" :class="{ '-hover': hover, '-no-padding': noPadding, '-tiny': tiny }">
      <div v-if="$slots.header" class="ui-table-header">
        <div class="ui-table-row -head">
          <slot name="header" />
        </div>
      </div>
      <slot name="body" />
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import './Table.scss';
</style>
