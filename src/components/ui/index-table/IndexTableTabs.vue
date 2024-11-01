<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue';
import Tab from '../tab/Tab.vue';
import TabItem from '../tab/TabItem.vue';
import type { IndexTableTabsEmits, IndexTableTabsProps } from './types';

const props = withDefaults(defineProps<IndexTableTabsProps>(), {
  tabs: () => [
    {
      label: 'Todos',
      key: 'all',
      active: true,
    },
  ],
});
const emit = defineEmits<IndexTableTabsEmits>();

const currentTab = ref('');
currentTab.value = props.tabs[0].key;

const activeTab = computed(() => props.tabs?.find((tab) => tab.active) ?? props.tabs[0]);

watch(
  () => activeTab.value,
  () => {
    // TODO: Pensar como computar a aba ativa no tab
    console.debug('🟣 >> watch >> activeTab.value:', activeTab.value);
    currentTab.value = activeTab.value.key;
  }
);
</script>

<template>
  <Tab v-model="currentTab" class="index-table-tabs">
    <TabItem
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.label"
      :index="item.key"
      @click="emit('open-tab', item.key)" />
  </Tab>
</template>

<style lang="scss" scoped>
@import './IndexTableTabs.scss';
</style>
