<script setup lang="ts">
import { ref } from 'vue'
import PageHelper from '../page-helper/PageHelper.vue'
import PageHelperArticleModal from '../page-helper-articles/PageHelperArticlesModal.vue'

export interface IArticle {
	name: string
	url: string
}

export interface IArticlesHelper {
	title?: string
	articles?: IArticle[]
}

const props = defineProps<IArticlesHelper>()

const pageHelperArticleModalRef = ref()
const openArticleModal = () => {
	pageHelperArticleModalRef.value.open({ title: props.title, articles: props.articles })
}
</script>

<template>
	<PageHelper :helper-name="title || 'esse item'" @onClickLink="openArticleModal" />
	<PageHelperArticleModal ref="pageHelperArticleModalRef" />
</template>
