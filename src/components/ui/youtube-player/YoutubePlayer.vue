<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { YoutubePlayerProps } from './types';

const props = defineProps<YoutubePlayerProps>();
const player = ref();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
  const options = {
    height: props.height || '360',
    width: props.width || '640',
    videoId: props.videoId,
    events: {
      onReady: onPlayerReady,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player.value = new (window as any).YT.Player('player', options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onPlayerReady(event: any) {
  event.target.playVideo();
}

function addYoutubeScriptTag() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(window as any).onYTReady) addYoutubeScriptTag();
  else onYouTubeIframeAPIReady();
});
</script>

<template>
  <div id="player" />
</template>
