<script setup lang="ts">
defineProps<{
	text?: string
}>()
</script>
<template>
	<label class="form-control-label" style="display: block">
		{{ text }}
		<slot />
	</label>
</template>
