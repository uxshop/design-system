<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
	action?: boolean
	drag?: boolean
	auto?: boolean
	handle?: boolean
	width?: string | number
}>()

const classList = ref<string[]>([])
const styleCustom = ref<{
	width?: number | string
}>({})

onMounted(() => {
	if (props.onAction) {
		classList.value.push('-auto')
	}
	if (props.drag) {
		classList.value.push('-drag')
	}
	if (props.handle) {
		classList.value.push('-handle')
	}
	if (props.auto) {
		classList.value.push('-auto')
	}
	if (props.width) {
		styleCustom.value.width = `${props.width}px`
	}
})
</script>
<template>
	<div class="ui-table-cell" :class="classList" :style="styleCustom">
		<slot />
	</div>
</template>
