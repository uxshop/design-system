<script setup lang="ts">
import { ref } from 'vue'
import Aside from '../../ui/aside/Aside.vue'
import Link from '../../ui/link/Link.vue'
import type { IArticle, IArticlesHelper } from './PageHelperArticles.vue'

withDefaults(
	defineProps<{
		title?: string
		supportTitle?: string
	}>(),
	{
		title: 'Base de conhecimento',
		supportTitle: 'Para encontrar ainda mais informações, explore nossos artigos disponíveis na base de conhecimento.'
	}
)

const aside = ref(false)
const itemTitle = ref<string>('Ajuda')
const helperArticles = ref<IArticle[]>()

const open = (item: IArticlesHelper) => {
	helperArticles.value = item.articles
	if (item.title) itemTitle.value = item.title
	aside.value = true
}

defineExpose({
	open
})
</script>

<template>
	<Aside v-model="aside" :title="itemTitle" size="sm">
		<div class="page-helper-articles">
			<div class="page-helper-articles-default">
				<h3>{{ title }}</h3>
				<p class="page-helper-articles-default-support">
					{{ supportTitle }}
				</p>
			</div>
			<ul class="page-helper-articles-list">
				<li class="page-helper-articles-item" v-for="item in helperArticles" :key="item.url">
					<Link :href="item.url" target="_blank">
						{{ item.name }}
					</Link>
				</li>
			</ul>
		</div>
	</Aside>
</template>
<style lang="scss">
.page-helper-articles {
	&-default {
		margin: 0 0 20px;
		display: inline-block;

		&-support {
			margin: 0;
		}
	}

	&-list {
		padding-left: 0;
		list-style: none;
	}

	&-item {
		padding: 10px 0;
		margin: 0;
		border-top: solid 1px var(--border-color);
	}
}
</style>
