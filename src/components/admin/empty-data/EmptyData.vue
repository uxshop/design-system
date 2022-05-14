<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

defineProps<{
	label?: string
	icon?: string
	iconType?: 'outlined' | 'filled' | 'rounded' | 'twotone' | undefined
	link?: boolean
}>()
</script>

<template>
	<div class="ui-empty-data" :class="{ 'ui-empty-data-link': link }">
		<Icon v-if="icon" :name="icon" :type="iconType" v-show="icon" class="ui-empty-data-icon" />
		<span class="ui-empty-data-icon-text">
			{{ label }}
			<slot />
		</span>
	</div>
</template>

<style lang="scss">
@import './EmptyData.scss';
</style>
