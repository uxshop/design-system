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
	display: flex;
	gap: var(--form-group-margin-bottom);
	align-items: flex-end;

	> div {
		flex-grow: 1;
	}

	+ .ui-form-layout-item {
		margin-top: var(--form-group-margin-bottom);
	}

	+ .ui-button {
		margin-top: var(--form-group-margin-bottom);
	}
}
</style>
