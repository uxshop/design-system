<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
import Button from '../../ui/button/Button.vue'
import type { IAction } from '../../../types/IAction'

defineProps<{
	label?: string
	icon?: string
	caption?: string
	iconType?: 'outlined' | 'filled' | 'rounded' | 'twotone' | undefined
	link?: boolean
	actions?: IAction
	noBorder?: boolean
}>()
</script>

<template>
	<div class="ui-empty-data" :class="{ 'ui-empty-data-link': link, '-border': !noBorder }">
		<div class="ui-empty-data-content">
			<Icon v-if="icon" :name="icon" :type="iconType" v-show="icon" class="ui-empty-data-icon" size="24" />
			<p class="ui-empty-data-text">
				<slot>{{ label }}</slot>
			</p>
		</div>
		<div v-if="caption" class="ui-empty-data-caption">
			<slot name="caption">{{ caption }}</slot>
		</div>
		<div v-if="actions" class="ui-empty-data-actions">
			<Button v-for="item in actions" size="sm" :label="item.label" @click="item.onAction" />
		</div>
	</div>
</template>

<style lang="scss">
@import './EmptyData.scss';
</style>
