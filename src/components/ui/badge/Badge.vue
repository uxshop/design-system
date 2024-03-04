<script setup lang="ts">
import { computed } from 'vue'
import type { Size, Variant } from '../../../types/Types'

type BadgeSize = Size
type BadgeVariant = Variant

export interface BadgeProps {
	label?: string | number
	pill?: boolean
	size?: Size
	variant?: 'highlight' | 'warning' | 'success' | 'critical' | 'default'
}

const props = withDefaults(defineProps<BadgeProps>(), {
	size: 'md',
	variant: 'default'
})

const badgeClassList = computed(() => {
	let classes = []

	if (props.pill) {
		classes.push('-pill')
	}

	if (props.size) {
		classes.push(`-size-${props.size}`)
	}

	if (props.variant) {
		classes.push(`-variant-${props.variant}`)
	}

	return classes
})
</script>

<template>
	<span class="ui-badge" :class="badgeClassList">
		<slot>{{ label }}</slot>
	</span>
</template>

<style lang="scss">
@import './Badge.scss';
</style>
