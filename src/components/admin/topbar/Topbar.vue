<script setup lang="ts">
import { inject } from 'vue';
import Breadcrumb from '../../ui/breadcrumb/UiBreadcrumb.vue';
import BreadcrumbItem from '../../ui/breadcrumb/BreadcrumbItem.vue';
import Icon from '../../ui/icon/Icon.vue';

import ButtonDarkmode from '../../admin/button-darkmode/ButtonDarkmode.vue';
import type { TopbarProps } from './types';

const props = withDefaults(defineProps<TopbarProps>(), {
  dropdown: () => [],
});

const emit = defineEmits(['toggleMenu', 'toggleNotification', 'changeSchemeColor']);
const menu = inject<{ toggle(): void }>('menu');

const onToggleMenu = () => {
  emit('toggleMenu');

  if (menu) menu.toggle();
};

const onNotification = () => {
  emit('toggleNotification');
};

const changeSchemeColor = () => emit('changeSchemeColor');
</script>

<template>
  <div class="ui-topbar" id="ui-topbar">
    <div class="ui-topbar-wrapper">
      <div class="ui-topbar-content">
        <div class="ui-topbar-mobile">
          <button class="ui-topbar-menu" @click="onToggleMenu">
            <Icon name="menu" />
          </button>
          <slot name="logo-mobile" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem :to="{ name: backlink.to }" class="btn-back" v-if="backlink">
            <Icon name="arrow_back" />
            <span>voltar</span>
          </BreadcrumbItem>
          <BreadcrumbItem :to="{ name: 'home' }">
            <span>Início</span>
          </BreadcrumbItem>
          <BreadcrumbItem v-for="item in breadcrumb" :to="{ name: item.to }" :key="item.name">
            <span>{{ item.name }}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div class="ui-topbar-actions">
        <div class="ui-topbar-actions">
          <slot name="topbar-actions" />

          <ButtonDarkmode @on-changed-theme="changeSchemeColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './Topbar.scss';
</style>
