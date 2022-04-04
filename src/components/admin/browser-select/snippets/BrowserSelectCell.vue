<script setup lang="ts">
defineProps<{
	auto?: boolean
}>()
</script>
<template>
	<div class="browser-list-cell" :class="{ '-auto': auto }">
		<slot />
	</div>
</template>
