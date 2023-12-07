<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Size } from '../../../types/Types'

export interface ColorThumbProps {
	hexadecimal?: string
	hexadecimalSecondary?: string
	image?: string
	size?: Size
	width?: number | string
}

const props = withDefaults(defineProps<ColorThumbProps>(), {
	size: 'md'
})

const colorThumbClassList = computed(() => {
	let classes = []

	if (props.size) {
		classes.push(`-size-${props.size}`)
	}

	return classes
})

const customStyle = ref<{
	width?: string
}>({})

if (props.width) {
	customStyle.value.width = `${props.width}px`
}
</script>

<template>
	<span class="ui-color-thumb" :class="colorThumbClassList" :style="customStyle">
		<span v-if="image" class="ui-color-thumb-image" :style="{ backgroundImage: `url(${image})` }" />
		<template v-else>
			<span class="ui-color-thumb-color" :style="{ backgroundColor: hexadecimal }" />
			<span class="ui-color-thumb-color -secondary" :style="{ backgroundColor: hexadecimalSecondary }" />
		</template>
	</span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
