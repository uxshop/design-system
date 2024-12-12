<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue';
import type { TabItemProps, TabProviderInterface } from './types';

const props = defineProps<TabItemProps>();

const active = ref(false);
const tabsProvider: TabProviderInterface | undefined = inject('tabs');
let indexTab: string | number = 0;

if (tabsProvider) {
  indexTab = props.index || tabsProvider.tabs.length;
  tabsProvider.tabs.push(indexTab);
}

const onClick = (evt: MouseEvent) => {
  if (tabsProvider) {
    tabsProvider.active(indexTab, evt);
  }
};

watchEffect(() => {
  if (tabsProvider?.activeTabIndex === indexTab) {
    active.value = true;
  } else {
    active.value = false;
  }
});
</script>

<template>
  <button type="button" class="ui-tab-item" :disabled :class="{ '-active': active }" @click="onClick">
    <span class="ui-tab-item-content">
      <slot>{{ label }}</slot>
      <span v-if="badge" class="ui-tab-item-badge">
        {{ badge }}
      </span>
    </span>
  </button>
</template>

<style lang="scss">
@import './TabItem.scss';
</style>
