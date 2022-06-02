<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Aside from '../../ui/aside/Aside.vue'
// import { YoutubeVue3 } from 'youtube-vue3'
import Link from '../../ui/link/Link.vue'
import AsideSection from '../../ui/aside/AsideSection.vue'
import YoutuvePlayer from '../../ui/youtube-player/YoutuvePlayer.vue'

const video = ref<any>({})
const aside = ref(false)

const open = (item: any) => {
	video.value = item
	aside.value = true
}

defineExpose({
	open
})
</script>

<template>
	<Aside v-model="aside" :title="video.title || 'Ajuda'" size="sm">
		<div class="page-helper-video-modal">
			<AsideSection>
				<div class="videoWrapper">
					<YoutuvePlayer :videoid="video.video_id" :width="480" :height="320" :controls="1" style="width: 100%" />
				</div>
			</AsideSection>
			<AsideSection>
				<a class="page-helper-video-link">
					<img src="./knowledge.svg" class="svg-inverter" />
				</a>
				<ul class="page-helper-video-modal-list">
					<li v-for="item in video.articles">
						<Link :href="item.url" target="_blank">
							{{ item.name }}
						</Link>
					</li>
				</ul>
			</AsideSection>
		</div>
	</Aside>
</template>

<style lang="scss">
.page-helper-video-modal {
	.videoWrapper {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
	}

	.videoWrapper iframe {
		border-radius: var(--border-radius);
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.page-helper-video-link {
		margin: 0 0 20px;
		display: inline-block;

		img {
			display: block;
		}
	}

	.page-helper-video-modal-list {
		padding-left: 0;
		list-style: none;

		li {
			padding: 10px 0;
			margin: 0;
			border-top: solid 1px var(--border-color);
		}
	}
}
</style>
