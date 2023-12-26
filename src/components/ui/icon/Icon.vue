<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

export interface IconProps {
	filled?: boolean
	name?: string
	size?: number | string
}

const props = withDefaults(defineProps<IconProps>(), {
	type: 'outlined',
	size: 16
})

const iconStyleList = computed(() => {
	let styles: StyleValue = {}

	if (props.filled) {
		styles.fontVariationSettings = "'FILL' 1"
	}

	if (props.size) {
		styles.fontSize = props.size + 'px'
		styles.height = props.size + 'px'
	}

	return styles
})
</script>

<template>
	<i class="ui-icon material-symbols-outlined" :style="iconStyleList">
		{{ name }}
	</i>
</template>

<style lang="scss">
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
