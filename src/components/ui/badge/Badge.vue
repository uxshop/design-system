<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	size?: string
	pill?: boolean
	variant?: string
	label?: string
}>()

const classList = ref<string[]>([])

const style = ref<string[]>([])

if (props.pill) {
	classList.value.push('-pill')
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}
</script>

<template>
	<span class="ui-badge" :class="classList" :style="style">
		<slot>{{ label }}</slot>
	</span>
</template>

<style lang="scss">
@import './Badge.scss';
</style>
