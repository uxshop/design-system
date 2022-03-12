<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
</script>

<template>
	<div class="ui-page-helper">
		<icon name="info" />
		<div class="ui-page-helper-text">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './PageHelper.scss';
</style>
