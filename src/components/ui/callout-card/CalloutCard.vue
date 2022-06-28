<script setup lang="ts">
import Card from '../card/Card.vue'
import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'
import type { IAction } from 'src/types/IAction'

defineProps<{
	title?: string
	icon?: string
	primaryAction?: IAction
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
				<Button
					:to="primaryAction.to"
					:variant="primaryAction?.variant"
					:label="primaryAction?.label"
					@click="primaryAction?.onAction"
					:leadingIcon="primaryAction.leadingIcon" />
			</div>
		</div>
	</Card>
</template>

<style lang="scss">
@import './CalloutCard.scss';
</style>
