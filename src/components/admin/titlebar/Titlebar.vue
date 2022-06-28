<script setup lang="ts">
import IconButton from '../../ui/icon-button/IconButton.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import DropdownItemButton from '../../ui/dropdown/DropdownItemButton.vue'
import Button from '../../ui/button/Button.vue'
import type { IAction } from 'src/types/IAction'

defineProps<{
	title?: string | null
	to?: object
	backlink?: { to: string }
	primaryAction?: IAction
	secondaryActions?: IAction[]
	groupActions?: {
		name: string
		actions: IAction[]
	}
}>()
</script>

<template>
	<div class="titlebar">
		<div class="titlebar-content">
			<div class="titlebar-title --mobile">
				<IconButton v-if="backlink" :to="{ name: backlink.to }" icon="arrow_back" />
				<h2 class="titlebar-text">{{ title }}</h2>
				<!-- <h2 v-else class="titlebar-text">{{ title }}</h2> -->
			</div>
			<!-- <div class="titlebar-title --dekstop">
				<h2 class="titlebar-text">{{ title }}</h2>
			</div> -->
			<slot name="subtitle" class="titlebar-subtitle" />
		</div>
		<div class="titlebar-actions">
			<div v-if="secondaryActions?.length" class="titlebar-actions-secondary">
				<Button
					v-if="secondaryActions?.length == 1"
					v-for="item in secondaryActions"
					:class="item.class"
					variant="plain"
					:label="item.label"
					@click="item.onAction" />
				<Dropdown v-else right>
					<template #button-content>
						<Button variant="plain" label="Mais ações" trailingIcon="expand_more" />
					</template>
					<DropdownItemButton
						v-for="item in secondaryActions"
						:label="item.label"
						@click="item.onAction"
						:class="item.class" />
				</Dropdown>
			</div>
			<div v-if="primaryAction" class="titlebar-actions-primary">
				<Button
					variant="primary"
					:to="to"
					:label="primaryAction.label"
					@click="primaryAction.onAction"
					:class="primaryAction.class" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Titlebar.scss';
</style>
