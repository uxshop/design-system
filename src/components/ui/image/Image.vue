<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import Icon from '../icon/Icon.vue'

export interface ImageProps {
	src?: string
	size?: number | string
	rounded?: boolean
}

const props = withDefaults(defineProps<ImageProps>(), {
	size: 50
})

const imageClassList = computed(() => {
	let classes = []

	if (!props.src) {
		classes.push('-no-image')
	}

	if (props.rounded) {
		classes.push('-is-rounded')
	}

	return classes
})

const imageStyleList = computed(() => {
	const styles: StyleValue = {}

	if (props.size) {
		styles.width = `${props.size}px`
	}

	return styles
})

const iconStyleList = computed(() => {
	const styles: StyleValue = {}

	if (props.size) {
		styles.fontSize = `${Number(props.size) / 2.5}px`
		styles.width = `${Number(props.size) / 2.5}px`
		styles.minHeight = `${Number(props.size) / 2.5}px`
	}

	return styles
})
</script>

<template>
	<div class="ui-image" :class="imageClassList">
		<img v-if="src" :src="src" class="ui-image-content" />
		<Icon v-else name="wallpaper" class="ui-image-icon" size="22" />
	</div>
</template>

<style lang="scss">
@import './Image.scss';

.ui-image,
.ui-image-content {
	width: v-bind('imageStyleList.width');
}

.ui-image {
	&-icon {
		font-size: v-bind('iconStyleList.fontSize');
		width: v-bind('iconStyleList.width');
		min-height: v-bind('iconStyleList.minHeight');
	}
}
</style>
