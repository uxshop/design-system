<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import PageHelperVideoModal from './PageHelperVideoModal.vue'

export interface IVideo {
	video_id: string
	name?: string
	articles?: {
		name: string
		url: string
	}[]
}

const props = defineProps<{
	video: IVideo
}>()

const pageHelperVideoModalRef = ref()

const onClick = () => {
	pageHelperVideoModalRef.value.open(props.video)
}
</script>

<template>
	<div class="ui-page-helper-video" v-if="video.video_id" @click="onClick">
		<div class="ui-page-helper-video-message">
			<Icon class="ui-page-helper-video-icon" name="play_circle" filled size="24"></Icon>
			<span>
				<b>Precisa de ajuda?</b> Assista o vídeo sobre
				<b class="text-lowercase">{{ video.name }}</b>
			</span>
		</div>
	</div>
	<PageHelperVideoModal ref="pageHelperVideoModalRef" />
</template>

<style lang="scss">
@import './PageHelperVideo.scss';
</style>
