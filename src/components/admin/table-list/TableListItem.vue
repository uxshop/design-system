<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	auto?: boolean
	nowrap?: boolean
}>()

const classList = ref<string[]>([])

if (props.auto) {
	classList.value.push('-auto')
}
if (props.nowrap) {
	classList.value.push('-nowrap')
}
</script>

<template>
	<div class="table-list-item" :class="classList">
		<slot />
	</div>
</template>
