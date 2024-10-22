<script setup lang="ts">
import { ref } from 'vue';
import PageHelper from '../page-helper/PageHelper.vue';
import PageHelperArticleModal from '../page-helper-articles/PageHelperArticlesModal.vue';
import type { PageHelperArticlesProps } from './types';

const props = defineProps<PageHelperArticlesProps>();

const pageHelperArticleModalRef = ref();
const openArticleModal = () => {
  pageHelperArticleModalRef.value.open({ title: props.title, articles: props.articles });
};
</script>

<template>
  <PageHelper :helper-name="title || 'esse item'" @onClickLink="openArticleModal" />
  <PageHelperArticleModal ref="pageHelperArticleModalRef" />
</template>
