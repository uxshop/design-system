<script setup lang="ts">
import Link from '../link/Link.vue';
import Icon from '../icon/Icon.vue';
import type { CardInfoLinkProps } from './types';

const props = withDefaults(defineProps<CardInfoLinkProps>(), {
  linkLabel: 'Acessar',
});

const emits = defineEmits(['onClickCard']);
</script>

<template>
  <div class="card-info-link-wrapper" :class="{ '-highlighted': highlighted }" @click="emits('onClickCard')">
    <div class="header">
      <div class="icon-wrapper">
        <Icon :name="iconName" />
      </div>
      <div class="title-wrapper" v-if="title">
        <h5 v-html="title"></h5>
      </div>
    </div>
    <div class="description-wrapper" :class="{ '-no-link': !href }" v-if="description">
      <p v-html="description"></p>
    </div>
    <Link v-if="href" :href="href" :to="{ name: routeName }" :external="href ? true : false" v-html="linkLabel" />
  </div>
</template>

<style lang="scss" scoped>
@import './CardInfoLink.scss';
</style>
