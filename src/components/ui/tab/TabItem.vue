<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';
import type { TabProviderInterface } from './TabProviderInterface';

const props = defineProps<{
  label?: string;
  index?: any;
  badge?: string | number;
}>();

const active = ref(false);
const tabsProvider: TabProviderInterface | undefined = inject('tabs');
let _index: string | number = 0;

if (tabsProvider) {
  _index = props.index || tabsProvider.tabs.length;
  tabsProvider.tabs.push(_index);
}

const onClick = (evt: MouseEvent) => {
  if (tabsProvider) {
    tabsProvider.active(_index, evt);
  }
};

watchEffect(() => {
  if (tabsProvider?.activeTabIndex == _index) {
    active.value = true;
  } else {
    active.value = false;
  }
});
</script>

<template>
  <button type="button" class="ui-tab-item" :class="{ '-active': active }" @click="onClick">
    <span class="ui-tab-item-content">
      <slot>{{ label }}</slot>
      <span class="ui-tab-item-badge" v-if="badge">
        {{ badge }}
      </span>
    </span>
  </button>
</template>

<style lang="scss">
@import './TabItem.scss';
</style>
