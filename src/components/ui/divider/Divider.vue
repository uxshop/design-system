<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		transparent?: boolean
		height?: string
		margin?: string
	}>(),
	{
		height: '2px'
	}
)

const customStyle: any = {
	height: props.height
}

if (props.margin) {
	customStyle.marginTop = props.margin
	customStyle.marginBottom = props.margin
}
</script>

<template>
	<hr class="ui-divider" :class="{ '-transparent': transparent }" :style="customStyle" />
</template>

<style lang="scss">
@import './Divider.scss';
</style>
