<script setup lang="ts">
defineProps<{
	group?: boolean
}>()
</script>
<template>
	<div class="ui-form-layout-item" :class="{ '-group': group }">
		<slot />
	</div>
</template>

<style lang="scss">
.ui-form-layout-item {
	+ .ui-form-layout-item {
		margin-top: var(--form-group-margin-bottom);
	}

	// > div {
	// 	margin-top: var(--form-group-margin-bottom);
	// }

	&.-group {
		display: flex;
		gap: var(--grid-gutter-width);
	}
}
</style>
