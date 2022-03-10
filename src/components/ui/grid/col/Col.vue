<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{
	cols?: string | number
	sm?: string | number
	md?: string | number
	offset?: string | number
	offsetSm?: string | number
	auto?: boolean
}>()

const classList = ref<any[]>(['ui-col'])

if (props.cols == 'auto' || props.auto) {
	classList.value.push('ui-col-auto')
} else if (props.cols) {
	classList.value.push(`-col-${props.cols}`)
}

if (props.sm) {
	classList.value.push([`-sm-${props.sm}`])
}

if (props.md) {
	classList.value.push([`-md-${props.md}`])
}

if (props.offset) {
	classList.value.push(`-offset-${props.offset}`)
}

if (props.offsetSm) {
	classList.value.push(`-offset-sm-${props.offsetSm}`)
}
</script>

<template>
	<div :class="classList">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Col.scss';
</style>
