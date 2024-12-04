<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch } from 'vue';
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

const activeTab = computed(() => props.tabs?.find((tab) => tab.active) ?? props.tabs[0]);

const onChangeTab = (key: string) => {
  currentTab.value = key;
  emit('open-tab', key);
};

onMounted(() => {
  currentTab.value = activeTab.value.key;
});
watch(
  () => activeTab.value,
  () => {
    currentTab.value = activeTab.value.key;
  }
);
</script>

<template>
  <Tab v-model="currentTab" class="ui-index-table-tabs">
    <TabItem
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.label"
      :index="item.key"
      @click="onChangeTab(item.key)" />
  </Tab>
</template>

<style lang="scss" scoped>
@import './IndexTableTabs.scss';
</style>
