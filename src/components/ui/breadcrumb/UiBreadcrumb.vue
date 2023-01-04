<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
withDefaults(
	defineProps<{
		to: object
		icon?: boolean
	}>(),
	{ icon: false }
)
</script>

<template>
	<div class="ui-breadcrumb">
		<Icon v-if="icon" name="arrow_back" class="-icon" />
		<slot />
	</div>
</template>

<style lang="scss">
@import './BreadCrumb.scss';
</style>
