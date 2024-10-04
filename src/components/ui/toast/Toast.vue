<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import type { Variant } from '../../../types';

interface ToastProps {
  className?: string;
  closeable?: boolean;
  duration?: number;
  id?: string;
  message?: string;
  variant?: Variant | 'default';
}

interface StateInterface {
  option: Record<string, string>;
  timer: ReturnType<typeof setTimeout> | null;
  showing: boolean;
}

const props = withDefaults(defineProps<ToastProps>(), {
  duration: 2000,
  variant: 'default',
});

const styleClasses = ref<string[]>([]);

const closed = ref(false);
const state = reactive<StateInterface>({
  option: {},
  showing: false,
  timer: null,
});

const toastClassList = computed(() => {
  if (props.variant) {
    styleClasses.value.push(`-variant-${props.variant}`);
  }

  return styleClasses.value;
});

const close = () => {
  closed.value = true;
  state.timer = null;
  toastClassList.value.push('-leave');
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
  <div class="ui-toast" :class="toastClassList" v-if="state.showing">
    <div class="ui-toast-body">
      <div v-html="message" />
    </div>
    <Icon v-if="closeable" class="ui-toast-close" name="close" @click="close" />
  </div>
</template>

<style lang="scss">
@import './Toast.scss';
</style>
