<script setup lang="ts">
import { ref, computed } from 'vue'
import Titlebar from '../titlebar/Titlebar.vue'
import PageMessageSupport from '../page-message-support/PageMessageSupport.vue'
import PageHelperVideo, { type IVideo } from '../page-helper-video/PageHelperVideo.vue'
import PageHelperArticles, { type IArticle, type IArticlesHelper } from '../page-helper-articles/PageHelperArticles.vue'
import type { IAction } from '../../../types/IAction'

export interface Props {
	hideTitle?: boolean
	primaryAction?: IAction | null
	secondaryActions?: IAction[]
	to?: object
	backlink?: object
	size?: 'sm' | 'md' | 'lg' | 'full'
	videoHelp?: IVideo
	articlesHelp?: IArticle[]
	footerHelp?: any
	title?: string | null
	groupActions?: {
		name: string
		actions: IAction[]
	}
}

const props = defineProps<Props>()
const classList = ref<string[]>([])

const articlesHelp = computed<IArticlesHelper>(() => {
	const articlesHelp = {
		title: props?.title,
		articles: [] as IArticle[]
	}

	if (props?.articlesHelp?.length) {
		articlesHelp.articles = props.articlesHelp
	}

	articlesHelp.articles = props.videoHelp?.articles || []
	return articlesHelp as IArticlesHelper
})

if (props.size) {
	classList.value.push(`-${props.size}`)
}
</script>

<template>
	<div class="ui-page" :class="classList">
		<Titlebar v-if="!props.hideTitle" :title="title" :to="to" :backlink="backlink" v-bind="props">
			<template #titlebar-subtitle>
				<slot name="titlebar-subtitle" />
			</template>
		</Titlebar>
		<PageHelperVideo v-if="videoHelp?.video_id" :video="videoHelp" />
		<PageHelperArticles
			v-if="!videoHelp?.video_id && !!articlesHelp?.articles?.length"
			:articles="articlesHelp.articles"
			:title="articlesHelp.title" />
		<slot name="default" />
		<PageMessageSupport v-if="footerHelp" :name="footerHelp.name" :link="footerHelp.link" />
	</div>
	<!-- <Advertisings /> -->
</template>

<style lang="scss">
@import './Page.scss';
</style>
