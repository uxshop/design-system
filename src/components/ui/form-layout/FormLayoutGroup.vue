<template>
	<div class="ui-form-layout-group">
		<slot />
	</div>
</template>

<style lang="scss">
.ui-form-layout-group {
	display: flex;
	gap: var(--grid-gutter-width);

	> div {
		flex-grow: 1;
	}
}
</style>
