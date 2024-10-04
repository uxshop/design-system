<script setup lang="ts">
defineProps<{
  group?: boolean;
}>();
</script>
<template>
  <div class="ui-form-layout-item" :class="{ '-group': group }">
    <slot />
  </div>
</template>

<style lang="scss">
@import '../../../scss/mixins.scss';

.ui-form-layout-item {
  display: flex;
  gap: var(--s-spacing-x-small);

  > div {
    flex-grow: 1;
    width: 100%;
  }

  + .ui-form-layout-item {
    margin-top: var(--s-spacing-x-small);

    @include mobile {
      flex-direction: column;
    }
  }

  + .ui-alert {
    margin-top: var(--s-spacing-x-small);
  }

  + .ui-button {
    margin-top: var(--s-spacing-x-small);
  }
}
</style>
