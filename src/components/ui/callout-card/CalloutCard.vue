<script setup lang="ts">
import Card from '../card/Card.vue'
import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'
import type { IAction } from '../../../types/IAction'

export interface Props {
	title?: string
	icon?: string
	primaryAction?: IAction
	justifyCardActions?: string
	bgColorIconPrimary?: boolean
}
defineProps<Props>()
</script>

<template>
	<Card class="ui-callout-card">
		<div v-if="icon" class="ui-callout-card-icon" :class="{ '-bg-primary': bgColorIconPrimary }">
			<Icon :name="icon" size="30" />
		</div>
		<div class="ui-callout-card-content">
			<div class="ui-callout-card-header">
				<h5 class="ui-callout-card-title" v-if="title">
					{{ title }}
				</h5>
				<slot name="append-to-header" />
			</div>
			<div class="ui-callout-card-text">
				<slot />
			</div>
			<div
				class="ui-callout-card-actions"
				:style="{ 'justify-content': justifyCardActions || 'flex-end' }"
				v-if="primaryAction">
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
