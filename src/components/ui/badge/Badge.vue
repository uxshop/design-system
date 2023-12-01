<script setup lang="ts">
import { ref } from 'vue'
import type { ISize, IVariant } from 'src/types/ITypes'

type BadgeSizes = ISize
type BadgeVariants = IVariant

export interface Props {
	label?: string | number
	pill?: boolean
	size?: BadgeSizes
	variant?: BadgeVariants
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	size: 'md'
})

const classList = ref<string[]>([])
const style = ref<string[]>([])

if (props.pill) {
	classList.value.push('-pill')
}

if (props.size) {
	classList.value.push(`-size-${props.size}`)
}

if (props.variant) {
	classList.value.push(`-variant-${props.variant}`)
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
