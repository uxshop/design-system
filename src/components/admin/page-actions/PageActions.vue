<script setup lang="ts">
import type { IAction } from '../../../types/IAction'
import Button from '../../ui/button/Button.vue'

defineProps<{
	primaryAction?: IAction
	secondaryActions?: IAction[]
}>()
</script>

<template>
	<div class="ui-page-actions">
		<div v-if="secondaryActions" class="ui-page-actions-secondary">
			<Button v-for="item in secondaryActions" :variant="item.variant" @click="item.onAction" outline>
				{{ item.label }}
			</Button>
		</div>
		<div class="ui-page-actions-primary" v-if="primaryAction">
			<Button
				v-if="primaryAction"
				variant="success"
				type="submit"
				@click="primaryAction?.onAction"
				:to="primaryAction.to"
				:leadingIcon="primaryAction.leadingIcon">
				{{ primaryAction.label }}
			</Button>
		</div>
	</div>
</template>

<style lang="scss">
@import './PageActions.scss';
</style>
