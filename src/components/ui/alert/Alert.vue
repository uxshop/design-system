<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue';
import Icon from '../icon/Icon.vue';
const props = defineProps<{
  title?: string;
  variant?: 'success' | 'danger' | 'info' | 'warning';
  icon?: string;
  dismissible?: boolean;
  show?: boolean;
  center?: boolean;
  label?: string;
}>();
const emit = defineEmits(['dismissed']);
const open = ref(Boolean(props.show));

const iconsByVariant: Record<string, string> = {
  success: 'check_circle',
  danger: 'error',
  warning: 'warning',
};

const close = () => {
  open.value = false;
  emit('dismissed');
};

const styleClassList = computed(() => {
  let classList = [];
  if (props.variant) {
    classList.push(`-${props.variant}`);
  }

  if (props.center) {
    classList.push(`-center`);
  }

  if (props.dismissible) {
    classList.push(`-dismissible`);
  }

  return classList;
});

const currentIcon = computed(() => {
  let icon = props.icon;
  if (!props.icon && props.variant) {
    icon = iconsByVariant[props.variant];
  }
  return icon;
});

watchEffect(() => {
  open.value = Boolean(props.show);
});
</script>
<template>
  <div v-if="open" class="ui-alert" :class="styleClassList">
    <Icon v-if="currentIcon" class="ui-alert-icon" filled :name="currentIcon" size="24" />
    <div class="ui-alert-content">
      <h5 class="ui-alert-title" v-if="title">
        {{ title }}
      </h5>
      <div class="ui-alert-text">
        <slot>{{ label }}</slot>
      </div>
    </div>
    <button v-if="dismissible" type="button" class="ui-alert-close" @click="close">
      <Icon name="close" />
    </button>
  </div>
</template>

<style lang="scss">
@import './Alert.scss';
</style>
