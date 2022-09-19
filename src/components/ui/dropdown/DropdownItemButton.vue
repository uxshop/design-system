<script setup lang="ts">
defineProps<{
	label?: string
	close?: boolean
	class?: string
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<button class="ui-dropdown-item -button" type="button" :data-close="close" :class="class">
			<slot>{{ label }}</slot>
		</button>
	</div>
</template>
