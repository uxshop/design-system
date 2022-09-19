<script lang="ts" setup></script>

<template>
	<div class="ui-form-layout">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.ui-form-layout {
	> div {
		// margin-bottom: var(--form-group-margin-bottom);
	}
}
</style>
