<script setup lang="ts">
export interface Props {
	height?: string | number
	max?: string | number
	value?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	height: '3px',
	max: 100
})

function formattedHeight() {
	if (typeof props.height == 'number') {
		return props.height + 'px'
	}
	return props.height
}
</script>

<template>
	<progress class="ui-progress-bar" :value="value" :max="max" />
</template>

<style lang="scss">
.ui-progress-bar {
	height: v-bind(formattedHeight());
}
@import './ProgressBar.scss';
</style>
