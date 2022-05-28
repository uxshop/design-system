<script setup lang="ts">
defineProps<{
	label: string
	description?: string
}>()
</script>

<template>
	<div class="ui-description-list-item">
		<div class="ui-description-list-item-label">
			{{ label }}
		</div>
		<div class="ui-description-list-item-description">
			<slot>{{ description }}</slot>
		</div>
	</div>
</template>
