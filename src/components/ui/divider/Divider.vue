<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		transparent?: boolean
		height?: string
	}>(),
	{
		height: '2px'
	}
)

const customStyle = {
	height: props.height
}
</script>

<template>
	<hr class="ui-divider" :class="{ '-transparent': transparent }" :style="customStyle" />
</template>

<style lang="scss">
@import './Divider.scss';
</style>
