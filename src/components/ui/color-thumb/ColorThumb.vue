<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
	customStyle.value.width = `${props.width}`
}
</script>

<template>
	<span class="ui-color-thumb" :class="classList">
		<span class="ui-color-thumb-color" :style="{ backgroundColor: hexadecimal }"></span>
		<span class="ui-color-thumb-color -secondary" :style="{ backgroundColor: hexadecimalSecondary }"></span>
	</span>
</template>

<style lang="scss">
@import './ColorThumb.scss';
</style>
