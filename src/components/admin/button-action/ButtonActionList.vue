<script lang="ts" setup></script>

<template>
	<div class="button-action-list">
		<slot />
	</div>
</template>

<style lang="scss">
.button-action-list {
	display: flex;
	gap: 8px;
	white-space: nowrap;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
