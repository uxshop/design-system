<script setup lang="ts">
defineProps<{
	label?: string
	close?: boolean
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<button class="ui-dropdown-item -button" type="button" :data-close="close">
			<slot>{{ label }}</slot>
		</button>
	</div>
</template>
