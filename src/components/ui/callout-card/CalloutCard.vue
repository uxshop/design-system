<script setup lang="ts">
import Card from '../card/Card.vue'
import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'

export interface IAction {
	label?: string
	onAction?: any
}

defineProps<{
	title?: string
	primaryAction?: IAction
	icon?: string
}>()
</script>

<template>
	<Card class="ui-callout-card">
		<div v-if="icon" class="ui-callout-card-icon">
			<Icon :name="icon" size="30" />
		</div>
		<div class="ui-callout-card-content">
			<h5 class="ui-callout-card-title" v-if="title">
				{{ title }}
			</h5>
			<div class="ui-callout-card-text">
				<slot />
			</div>
			<div class="ui-callout-card-actions" v-if="primaryAction">
				<Button :label="primaryAction?.label" @click="primaryAction?.onAction" />
			</div>
		</div>
	</Card>
</template>

<style lang="scss">
@import './CalloutCard.scss';
</style>
