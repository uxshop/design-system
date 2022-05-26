<script setup lang="ts">
import Button from '../../ui/button/Button.vue'
interface IAction {
	label: string
	onAction(): void
	variant?: string
}
defineProps<{
	primaryAction?: IAction
	secondaryActions?: IAction[]
}>()
</script>

<template>
	<div class="ui-page-actions">
		<div v-if="secondaryActions" class="ui-page-actions-secondary">
			<Button v-for="item in secondaryActions" :variant="item.variant">
				{{ item.label }}
			</Button>
		</div>
		<div class="ui-page-actions-primary" v-if="primaryAction">
			<Button variant="success" type="submit" v-if="primaryAction" @click="primaryAction.onAction">
				{{ primaryAction.label }}
			</Button>
		</div>
	</div>
</template>

<style lang="scss">
@import './PageActions.scss';
</style>
