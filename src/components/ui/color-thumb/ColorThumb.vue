<script setup lang="ts">
import { ref } from 'vue'
import Image from '../image/Image.vue'

const props = defineProps<{
	hexadecimal?: string
	hexadecimalSecondary?: string
	image?: string
	size?: string
	width?: string
}>()

const customStyle = ref<{
	width?: string
	height?: string
}>({})

const classList: any[] = []

if (props.size) {
	classList.push(`-${props.size}`)
}

if (props.width) {
	customStyle.value.width = `${props.width}px`
	customStyle.value.height = `${props.width}px`
}
</script>

<template>
	<span class="ui-color-thumb" :class="classList" :style="customStyle">
		<span class="ui-color-thumb-image" v-if="image" :style="{ backgroundImage: `url(${image.src})` }" />
		<template v-else>
			<span class="ui-color-thumb-color" :style="{ backgroundColor: hexadecimal }"></span>
			<span class="ui-color-thumb-color -secondary" :style="{ backgroundColor: hexadecimalSecondary }"></span>
		</template>
	</span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
