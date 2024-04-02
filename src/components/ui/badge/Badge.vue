<script setup lang="ts">
import { computed } from 'vue'
import type { Size } from '../../../types/Types'

export interface BadgeProps {
	label?: string | number
	pill?: boolean
	size?: Size
	noWrap?: boolean
	variant?: 'highlight' | 'warning' | 'success' | 'critical' | 'default'
}

const props = withDefaults(defineProps<BadgeProps>(), {
	size: 'md',
	variant: 'default'
})

const badgeClasses = computed(() => {
	return [
		props.pill && '-pill',
		props.size && `-size-${props.size}`,
		props.variant && `-variant-${props.variant}`,
		props.noWrap && '-no-wrap'
	]
})

const badgeClassList = badgeClasses.value.filter((badgeClass) => badgeClass)
</script>

<template>
	<span class="ui-badge" :class="badgeClassList">
		<slot>{{ label }}</slot>
	</span>
</template>

<style lang="scss">
@import './Badge.scss';
</style>
