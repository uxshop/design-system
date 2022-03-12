<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

interface Props {
	video?: VideoInterface
}

interface VideoInterface {
	name?: string
	video_id?: boolean
}

withDefaults(defineProps<Props>(), {
	video: () => ({})
})
</script>

<template>
	<div class="ui-page-helper-video" @keydown.esc="close" v-if="video.video_id">
		<div class="ui-page-helper-video-message">
			<Icon class="ui-page-helper-video-icon" name="play_circle_filled"></Icon>
			<span>
				<b>Precisa de ajuda?</b> Assista o vídeo sobre
				<b class="text-lowercase">{{ video.name }}</b>
			</span>
		</div>
		<!-- <base-dialog-video-helper ref="dialog" :video="video" /> -->
	</div>
</template>

<style lang="scss">
@import './PageHelperVideo.scss';
</style>
