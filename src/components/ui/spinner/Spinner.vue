<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
	border: string | number
	size: string | number
	color: string
}

const props = withDefaults(defineProps<Props>(), {
	border: 3,
	size: 22
})

const style = reactive<any>({})

if (props.size) {
	style.width = `${props.size}px`
	style.height = `${props.size}px`
}

if (props.color) {
	style.color = `${props.color}`
}

style.borderWidth = `${props.border}px`
</script>

<template>
	<div class="ui-spinner" :style="style"></div>
</template>

<style lang="scss">
@import './Spinner.scss';
</style>
