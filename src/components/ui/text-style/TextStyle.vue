<script setup lang="ts">
import { computed } from 'vue'
import type { Variant } from '../../../types/Types'

type TextStyleVariant = Omit<Variant, 'link' | 'plain'> | 'strong' | 'muted'

export interface TextStyleProps {
	block?: boolean
	label?: string
	tag?: string
	variant?: TextStyleVariant
}

const props = withDefaults(defineProps<TextStyleProps>(), {
	tag: 'span'
})

const textStyleClassList = computed(() => {
	let classes = [props.variant ? `-variant-${props.variant}` : '', props.block ? `-block` : '']

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
