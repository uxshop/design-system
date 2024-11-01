<script setup lang="ts">
import { ref } from 'vue';

const scrolled = ref(false);

const onScroll = (e: UIEvent) => {
  const target = e.target as HTMLDivElement;
  scrolled.value = target.scrollTop > 20;
};
</script>

<template>
  <div class="ui-layout" _scroll="onScroll" id="wrapper" :class="{ '-scrolled': scrolled }">
    <div class="ui-layout-sidebar">
      <slot name="sidebar" />
    </div>
    <div class="ui-layout-navbar">
      <slot name="navbar" />
    </div>

    <div class="ui-layout-content" id="ui-layout-content">
      <div class="ui-layout-content-page">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './Layout.scss';
</style>
