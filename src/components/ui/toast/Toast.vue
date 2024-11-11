<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import type { StateInterface, ToastProps } from './types';

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 2000,
  variant: 'default',
});

const closed = ref(false);
const state = reactive<StateInterface>({
  option: {},
  showing: false,
  timer: null,
});

const animationClass = ref('');
const variantClass = computed(() => `-variant-${props.variant}`);

const close = () => {
  closed.value = true;
  state.timer = null;
  animationClass.value = '-leave';
  setTimeout(() => {
    state.showing = false;
  }, 300);
};

onMounted(() => {
  startTimer();
  state.showing = true;
});

const startTimer = () => {
  if (props.duration > 0) {
    state.timer = setTimeout(() => {
      if (!closed.value) {
        close();
      }
    }, props.duration);
  }
};
</script>

<template>
  <div v-if="state.showing" class="ui-toast" :class="[variantClass, animationClass]">
    <div class="ui-toast-body">
      <div v-html="message" />
    </div>
    <Icon v-if="closeable" class="ui-toast-close" name="close" @click="close" />
  </div>
</template>

<style lang="scss">
@import './Toast.scss';
</style>
