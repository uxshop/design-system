<script setup lang="ts">
import { shallowRef } from 'vue'

const props = defineProps<{
	action?: boolean
	drag?: boolean
}>()

const classList = shallowRef<string[]>([])

if (props.action) {
	classList.value.push('td-action')
}
if (props.drag) {
	classList.value.push('td-drag')
}
</script>
<template>
	<td :class="classList" class="ui-table-cell">
		<slot />
	</td>
</template>
