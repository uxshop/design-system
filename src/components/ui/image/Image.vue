<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../icon/Icon.vue'

interface Props {
	src?: string | null
	size?: number | string
}

interface StyleInterface {
	width?: string
	height?: string
}
interface StyleIconInterface {
	fontSize?: string
	width?: string
	minHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
	size: 50
})

const style = ref<StyleInterface>({})
const styleIcon = ref<StyleIconInterface>({})

if (props.size) {
	style.value.width = `${props.size}px`
	style.value.height = `${props.size}px`
	styleIcon.value.fontSize = `${Number(props.size) / 2.5}px`
	styleIcon.value.width = `${Number(props.size) / 2.5}px`
	styleIcon.value.minHeight = `${Number(props.size) / 2.5}px`
}
</script>

<template>
	<div class="ui-image -square" :style="style" :class="{ '-no-image': !src }">
		<img class="image-content" v-if="src" :src="src" />
		<span class="image-content" v-if="!src">
			<Icon name="wallpaper" :style="styleIcon" />
		</span>
	</div>
</template>

<style lang="scss">
@import './Image.scss';
</style>
