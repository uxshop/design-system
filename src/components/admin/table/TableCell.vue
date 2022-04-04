<script setup lang="ts">
import { shallowRef } from 'vue'

const props = defineProps<{
	action?: boolean
}>()

const classList = shallowRef<string[]>([])

if (props.action) {
	classList.value.push('td-action')
}
</script>
<template>
	<td :class="classList">
		<slot />
	</td>
</template>
