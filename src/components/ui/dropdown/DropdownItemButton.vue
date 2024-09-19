<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../icon/Icon.vue';
import type { IDropdownItemButton } from './types';

const props = withDefaults(defineProps<IDropdownItemButton>(), {
  iconPosition: 'right',
  iconFilled: true,
});

const getComponent = computed(() => {
  if (props.href) return 'a';

  if (props.to) return 'router-link';

  return 'button';
});

const typeToButton = computed(() => (getComponent.value === 'button' ? 'button' : ''));
</script>

<template>
  <div class="ui-dropdown-item-wrapper">
    <component
      :is="getComponent"
      class="ui-dropdown-item -button"
      :data-close="close"
      :class="class"
      :href="href"
      :to="to"
      :type="typeToButton">
      <slot>
        <span class="ui-dropdown-item-label">{{ label }}</span>
      </slot>

      <Icon
        v-if="icon ?? leadingIcon"
        :name="icon ?? leadingIcon"
        :filled="iconFilled"
        :size="iconSize"
        :class="{
          'leading-icon': true,
          '-left': iconPosition === 'left',
        }" />
    </component>
  </div>
</template>
