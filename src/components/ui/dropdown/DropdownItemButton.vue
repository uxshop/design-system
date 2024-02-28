<script setup lang="ts">
import Icon from '../icon/Icon.vue'

defineProps<{
	label?: string
	close?: boolean
	class?: string
	leadingIcon?: string
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<button class="ui-dropdown-item -button" type="button" :data-close="close" :class="class">
			<slot>
				<p class="ui-dropdown-item-label">{{ label }}</p>
			</slot>
			<Icon class="leading-icon" :name="leadingIcon" v-if="leadingIcon" filled/>
		</button>
	</div>
</template>
<style scoped lang="scss">
.ui-dropdown-item-label {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	margin: unset;
}
</style>
