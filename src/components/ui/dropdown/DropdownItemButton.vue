<script setup lang="ts">
defineProps<{
	label?: string
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<button class="ui-dropdown-item -button" type="button">
			<slot>{{ label }}</slot>
		</button>
	</div>
</template>
