<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  action?: boolean;
  drag?: boolean;
  auto?: boolean;
  handle?: boolean;
  width?: string | number;
  noWrap?: boolean;
}>();

const classList = ref<string[]>([]);
const styleCustom = ref<{
  width?: number | string;
}>({});

onMounted(() => {
  if (props.action) {
    classList.value.push('-auto');
  }
  if (props.drag) {
    classList.value.push('-drag');
  }
  if (props.handle) {
    classList.value.push('-handle');
  }
  if (props.auto) {
    classList.value.push('-auto');
  }
  if (props.noWrap) {
    classList.value.push('-nowrap');
  }
  if (props.width) {
    styleCustom.value.width = `${props.width}px`;
  }
});
</script>
<template>
  <div class="ui-table-cell" :class="classList" :style="styleCustom">
    <slot />
  </div>
</template>
