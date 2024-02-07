<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import type { Alignment, Distribuition, Spacing } from '../../../types/Types'

export interface StackProps {
	distribution?: Distribuition
	spacing?: Spacing
	alignment?: Alignment
	vertical?: boolean
	wrap?: boolean
	columns?: string | number
	horizontal?: boolean
}

const props = defineProps<StackProps>()

const stackClassList = computed(() => [
	props.distribution !== 'default' && props.distribution != undefined && `-distribute-${props.distribution}`,
	props.spacing !== 'default' && props.spacing != undefined && `-spacing-${props.spacing}`,
	props.vertical == true && '-vertical',
	props.alignment && `-align-${props.alignment}`,
	props.wrap == null || (props.wrap == false && '-no-wrap'),
	props.horizontal && '-sm-horizontal',
	props.columns && props.columns > 1 && '-custom-grid'
])

const stackStyleList = computed(() => {
	const styles: StyleValue = {}

	if (props.columns && window.innerWidth > 800) {
		styles.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
	}

	return styles
})
</script>
<template>
	<div class="ui-stack" :class="stackClassList" :style="stackStyleList">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Stack.scss';
</style>
