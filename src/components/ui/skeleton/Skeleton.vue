<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	width?: string
	height?: string
}>()

const style = ref<{
	width?: string
	height?: string
}>({})

if (props.width) {
	style.value.width = `${props.width}`
}
if (props.height) {
	style.value.height = `${props.height}`
}
</script>

<template>
	<div class="ui-skeleton" :style="style"></div>
</template>

<style lang="scss">
@import './Skeleton.scss';
</style>
