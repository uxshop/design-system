<script setup lang="ts">
defineProps<{
	label?: string | null
}>()
</script>
<template>
	<label class="form-control-label" style="display: block">
		<slot>{{ label }}</slot>
	</label>
</template>
