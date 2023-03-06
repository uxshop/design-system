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

	> div {
		flex-grow: 1;
		width: 100%;
	}

	+ .ui-form-layout-item {
		margin-top: var(--form-group-margin-bottom);
	}

	+ .ui-alert {
		margin-top: var(--form-group-margin-bottom);
	}

	+ .ui-button {
		margin-top: var(--form-group-margin-bottom);
	}
}
</style>
