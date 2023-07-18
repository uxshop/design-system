<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../icon/Icon.vue'

export interface Props {
	src?: string | null
	isBg?: boolean
	size?: number | string
}

interface crop {
	size: string
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

const styleIcon = ref<StyleIconInterface>({})
styleIcon.value.fontSize = `${Number(props.size) / 2.5}px`
styleIcon.value.width = `${Number(props.size) / 2.5}px`
styleIcon.value.minHeight = `${Number(props.size) / 2.5}px`

const style = computed(() => {
	const data: any = {}

	if (props.size) {
		data.width = `${props.size}px`
		data.height = `${props.size}px`
	}

	if (props.isBg) {
		data.backgroundImage = `url(${props.src})`
	}

	return data
})
</script>

<template>
	<div class="ui-image -square" :style="style" :class="{ '-no-image': !src, '-is-bg': isBg }">
		<img class="image-content" v-if="src && !isBg" :src="src" />
		<span class="image-content" v-if="!src">
			<Icon name="wallpaper" :style="styleIcon" />
		</span>
	</div>
</template>

<style lang="scss">
@import './Image.scss';
</style>
