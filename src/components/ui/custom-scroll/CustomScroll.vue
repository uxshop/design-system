<script setup lang="ts">
import PerfectScrollbar from 'perfect-scrollbar';
import { getCurrentInstance, onMounted } from 'vue';
import type { CustomScrollProps } from './types';

const props = defineProps<CustomScrollProps>();

const uid = `perfect-scroll-${getCurrentInstance()?.uid}`;

onMounted(() => {
  new PerfectScrollbar(`#${uid}`, props.settings);
});
</script>

<template>
  <div class="perfect-scroll" :id="uid">
    <slot />
  </div>
</template>

<style lang="scss">
@import './CustomScroll.scss';
@import 'perfect-scrollbar/css/perfect-scrollbar.css';
</style>
