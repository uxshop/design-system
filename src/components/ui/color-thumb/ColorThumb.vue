<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	hexadecimal?: string
	hexadecimalSecondary?: string
	image?: string
	sm?: boolean
	size?: number
}>()

const colorThumbClassList = computed(() => {
	let classes = []

	if (props.sm) {
		classes.push('-sm')
	}

	return classes
})

const colorThumbStyleList = computed(() => {
	if (props.size) {
		return `width: ${props.size}px`
	}
})
</script>

<template>
	<span class="ui-color-thumb" :class="colorThumbClassList" :style="colorThumbStyleList">
		<span class="ui-color-thumb-image" v-if="image" :style="{ backgroundImage: `url(${image})` }" />
		<template v-else>
			<span class="ui-color-thumb-color" :style="{ backgroundColor: hexadecimal }" />
			<span class="ui-color-thumb-color -secondary" :style="{ backgroundColor: hexadecimalSecondary }" />
		</template>
	</span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
