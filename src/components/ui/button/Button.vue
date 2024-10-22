<script setup lang="ts">
import { computed } from 'vue';
import Spinner from '../spinner/Spinner.vue';
import Icon from '../icon/Icon.vue';
import type { ButtonProps } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
  spinnerBorder: 2,
  type: 'button',
  size: 'md',
});

const componentType = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'BUTTON';
});

const classList = computed(() => [
  props.size ? `-${props.size}` : '',
  props.variant ? `-${props.variant}` : '-default',
  props.leadingIcon ? '-icon' : '',
  props.flush ? `-flush-${props.flush}` : '',
  props.block ? '-block' : '',
  props.outline ? '-outline' : '',
  props.disclosure ? '-disclosure' : '',
  (props.trailingIcon || props.leadingIcon) && !props.label ? '-only-icon' : '',
]);

const trailingIcon = computed(() => (props.disclosure ? 'arrow_drop_down' : props.trailingIcon));
</script>

<template>
  <component
    class="ui-button"
    :is="componentType"
    :type="type"
    :class="[classList, { '-loading': loading, '-disabled': disabled }]"
    :disabled="disabled"
    :to="to"
    :href="href"
    :target="target">
    <div class="ui-button-content">
      <Icon :name="leadingIcon" v-if="leadingIcon" />
      <Spinner v-if="loading" :size="16" :border="spinnerBorder" />
      <div v-if="label || $slots.default" class="ui-button-label">
        <slot>{{ label }}</slot>
      </div>
      <Icon :name="trailingIcon" v-if="trailingIcon" />
    </div>
  </component>
</template>

<style lang="scss">
@import './Button.scss';
</style>
