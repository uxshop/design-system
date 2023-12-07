<script setup lang="ts">
import { computed } from 'vue'
import type { Variant } from '../../../types/Types'

export interface TextStyleProps {
	block?: boolean
	label?: string
	tag?: string
	variant?: Variant | 'strong' | 'muted'
}

const props = withDefaults(defineProps<TextStyleProps>(), {
	variant: 'default',
	tag: 'span'
})

const textStyleClassList = computed(() => {
	let classes = []

	if (props.variant) {
		classes.push(`-variant-${props.variant}`)
	}

	if (props.block) {
		classes.push(`-block`)
	}

	return classes
})
</script>

<template>
	<component :is="tag" class="ui-text-style" :class="textStyleClassList">
		<slot>{{ label }}</slot>
	</component>
</template>

<style lang="scss">
@import './TextStyle.scss';
</style>
