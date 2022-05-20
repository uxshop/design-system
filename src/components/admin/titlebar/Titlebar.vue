<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
import IconButton from '../../ui/icon-button/IconButton.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import DropdownItemButton from '../../ui/dropdown/DropdownItemButton.vue'
import Button from '../../ui/button/Button.vue'

export interface IAction {
	label: string
	onAction(): void
}

defineProps<{
	title?: string | null
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
			<div class="titlebar-title -mobile">
				<router-link :to="{ name: backlink.to }" v-if="backlink" class="titlebar-backlink">
					<IconButton icon="arrow_back" />
					<h2 class="titlebar-text">{{ title }}</h2>
				</router-link>
				<h2 v-else class="titlebar-text">{{ title }}</h2>
			</div>
			<div class="titlebar-title -dekstop">
				<h2 class="titlebar-text">{{ title }}</h2>
			</div>
			<slot name="subtitle" class="titlebar-subtitle" />
		</div>
		<div class="titlebar-actions">
			<div class="titlebar-actions-secondary">
				<!-- <slot name="secondary-action" /> -->
				<!-- <Button v-for="item in secondaryActions" variant="plain" :label="item.label" @click="item.onAction" /> -->
				<Dropdown v-if="secondaryActions" right>
					<template #button-content>
						<!-- <IconButton icon="more_horiz" /> -->
						<Button variant="plain" label="Mais ações" trailingIcon="expand_more" />
					</template>
					<DropdownItemButton v-for="item in secondaryActions" :label="item.label" @click="item.onAction" />
				</Dropdown>
			</div>
			<div v-if="primaryAction" class="titlebar-actions-primary">
				<Button variant="primary" :label="primaryAction.label" @click="primaryAction.onAction" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Titlebar.scss';
</style>
