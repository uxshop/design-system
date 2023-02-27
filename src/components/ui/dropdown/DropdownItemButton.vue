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
			<slot>{{ label }}</slot>
			<Icon :name="leadingIcon" v-if="leadingIcon" />
		</button>
	</div>
</template>
