<script setup lang="ts">
defineProps<{
	disabled: boolean
}>()
</script>

<template>
	<div class="ui-pagination-item" :class="{ '-disabled': disabled }">
		<slot />
	</div>
</template>

<style lang="scss">
@import './PaginationItem.scss';
</style>
