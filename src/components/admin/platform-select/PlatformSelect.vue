<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Icon from '../../ui/icon/Icon.vue';
import Tab from '../../ui/tab/Tab.vue';
import TabItem from '../../ui/tab/TabItem.vue';
import Badge from '../../ui/badge/Badge.vue';
import type { BadgeConfigType, IPlatform, PlatformSelectProps } from './types';

const badgeConfigDefault: BadgeConfigType = {
  beta: { variant: 'highlight', label: 'Beta' },
  comingSoon: { variant: 'default', label: 'Em breve' },
};

const props = defineProps<PlatformSelectProps>();

const badgeConfigMerged = computed(() => ({ ...badgeConfigDefault, ...(props.badgeConfig ?? {}) }));

const tab = ref('');

onMounted(() => {
  tab.value = props.platformsList.find((item) => item.active)?.key ?? props.platformsList[0].key;
});

const emits = defineEmits(['change:platform']);

const onChangeTab = (platform: IPlatform) => {
  emits('change:platform', platform);
};

const hasBadge = (platform: IPlatform) => !!platform.badgeStatus;
</script>

<template>
  <Tab v-model="tab" class="tab-container">
    <TabItem
      v-for="(platform, index) in platformsList"
      :key="index"
      class="tab-item-btn"
      :class="{ '-item-disabled': platform.disabled }"
      :label="platform.name"
      :index="platform.key"
      @click="onChangeTab(platform)">
      <div class="tab-item-container">
        <div v-if="hasBadge(platform)" class="badge-container">
          <Badge pill v-bind="badgeConfigMerged[platform.badgeStatus!]" />
        </div>
        <Icon :name="platform.icon" />
        <span class="name">{{ platform.name }}</span>
      </div>
    </TabItem>
  </Tab>
</template>

<style lang="scss">
@import './PlatformSelect.scss';
</style>
