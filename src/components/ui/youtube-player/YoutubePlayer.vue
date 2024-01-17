<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
	videoId: string
	width?: string | number
	height?: string | number
}>()

const player = ref()

window['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady

function onYouTubeIframeAPIReady() {
	player.value = new YT.Player('player', {
		height: props.height || '360',
		width: props.width || '640',
		videoId: props.videoId,
		events: {
			onReady: onPlayerReady
		}
	})
}

function onPlayerReady(event) {
	event.target.playVideo()
}

onMounted(() => {
	if (!window.onYTReady) {
		const tag = document.createElement('script')
		tag.src = 'https://www.youtube.com/iframe_api'
		const firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
	} else {
		onYouTubeIframeAPIReady()
	}
})
</script>

<template>
	<div id="player" />
</template>
