<script seutp lang="ts">
import { ref, watchEffect } from 'vue'

defineProps<{
	item?: { src: string }
}>()

const color = ref(null)
const colorSecondary = ref(null)

watchEffect(() => {
	handler((value: any) => {
		const item = value || {}

		if (item.image && item.image.src) {
			value.color = `background-image: url(${value.$options.filters.img_url(item.image.src)}); background-size: cover`
		} else {
			value.color = `background: ${item.hexadecimal}`
		}

		if (item.image_secondary && item.image_secondary.src) {
			value.colorSecondary = `background-image: url(${item.image_secondary.src})`
		} else {
			value.colorSecondary = `background: ${item.hexadecimal_secondary}`
		}
	})
})
</script>

<template>
	<span class="color-thumb">
		<span class="color-thumb-color" :style="color"></span>
		<span class="color-thumb-color color-thumb-color-secondary" :style="colorSecondary"></span>
	</span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
