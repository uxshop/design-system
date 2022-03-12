<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	alignV?: string
}>()

const classList = ref<string[]>([])

if (props.alignV) {
	classList.value.push(`-align-items-${props.alignV}`)
}
</script>

<template>
	<div class="ui-row" :class="classList">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Row.scss';
</style>
