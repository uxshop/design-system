<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

export interface StackProps {
	distribution?: 'center' | 'right' | 'around' | 'evenly' | 'between' | 'default'
	spacing?: string
	alignment?: 'start' | 'center' | 'end' | 'fill'
	vertical?: boolean
	wrap?: boolean
	columns?: string | number
	horizontal?: boolean
}

const props = defineProps<StackProps>()

const stackClassList = computed(() => {
	let classes = []

	if (props.distribution != 'default' && props.distribution != undefined) {
		classes.push(`-distribute-${props.distribution}`)
	}

	if (props.spacing != 'default' && props.spacing != undefined) {
		classes.push(`-spacing-${props.spacing}`)
	}

	if (props.vertical == true) {
		classes.push('-vertical')
	}

	if (props.alignment) {
		classes.push(`-align-${props.alignment}`)
	}

	if (props.wrap == null && props.wrap == false) {
		classes.push('-no-wrap')
	}

	if (props.horizontal) {
		classes.push('-sm-horizontal')
	}

	if (props.columns && props.columns > 1) {
		classes.push('-custom-grid')
	}

	return classes
})

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
