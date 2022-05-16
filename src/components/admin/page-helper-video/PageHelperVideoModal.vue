<script setup lang="ts">
import { ref } from 'vue'
import Aside from '../../ui/aside/Aside.vue'
import { YoutubeVue3 } from 'youtube-vue3'
import Link from '../../ui/link/Link.vue'

const video = ref<any>({})
const aside = ref(false)

const open = (item: any) => {
	video.value = item
	aside.value = true
}

const onEnded = () => {
	console.log('ended')
}

defineExpose({
	open
})
</script>

<template>
	<Aside v-model="aside" :title="video.title">
		<div class="page-helper-video-modal">
			<div class="videoWrapper">
				<YoutubeVue3
					ref="youtube"
					:videoid="video.video_id"
					:width="480"
					:height="320"
					:controls="1"
					:modestbranding="0"
					@ended="onEnded"
					style="width: 100%" />
			</div>

			<a class="page-helper-video-link">
				<img src="./knowledge.svg" />
			</a>
			<ul class="page-helper-video-modal-list">
				<li v-for="item in video.articles">
					<Link>
						{{ item.name }}
					</Link>
				</li>
			</ul>
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
		margin: 20px 0;
		display: inline-block;

		img {
			display: block;
		}
	}

	.page-helper-video-modal-list {
		padding-left: 15px;

		li {
			margin-bottom: 10px;
		}
	}
}
</style>
