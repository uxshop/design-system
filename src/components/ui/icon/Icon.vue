<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import DSIcons from './snipets/ds-icons.json'
import type { IconType, DSIconsType } from './types'

export interface IconProps {
	filled?: boolean
	name?: IconType
	size?: number | string
}

const props = withDefaults(defineProps<IconProps>(), {
	size: 16
})

const isDSIcon = computed(() => !!props.name && props.name in DSIcons)

const iconStyleList = computed(() => {
	let styles: StyleValue = {}

	if (props.filled) {
		styles.fontVariationSettings = "'FILL' 1"
	}

	if (props.size) {
		styles.fontSize = props.size + 'px'
		styles.height = props.size + 'px'
	}

	if (isDSIcon.value) {
		styles.width = props.size + 'px'
	}

	return styles
})
</script>

<template>
	<span v-if="isDSIcon" class="ui-ds-icon" :style="iconStyleList" v-html="DSIcons[name as DSIconsType]"></span>
	<i v-if="!isDSIcon" class="ui-icon material-symbols-outlined" :style="iconStyleList">
		{{ name }}
	</i>
</template>

<style lang="scss">
.ui-ds-icon {
	color: inherit;
	fill: currentColor;
}
.ui-icon {
	font-variation-settings:
		'FILL' 0,
		'wght' 400,
		'GRAD' 200,
		'opsz' 32;
	width: auto;
	align-items: center;
	color: inherit;
}
</style>
