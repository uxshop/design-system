<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, computed } from 'vue'
import IconButton from '../../ui/icon-button/IconButton.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import DropdownItemButton from '../../ui/dropdown/DropdownItemButton.vue'
import Button from '../../ui/button/Button.vue'
import type { IAction } from '../../../types/IAction'

defineProps<{
	title?: string | null
	to?: Record<string, any>
	backlink?: { to: string }
	primaryAction?: IAction
	secondaryActions?: IAction[]
	groupActions?: {
		name: string
		actions: IAction[]
	}
}>()

const moreBtnMobileIcon = 'more_vert'
const checkIsDesktop = () => window.innerWidth > 768
const isDesktop = shallowRef(checkIsDesktop())

const getButtonLabel = computed(
	() => (label?: string, leadingIcon?: string) => isDesktop.value || !leadingIcon ? label : undefined
)

onMounted(() => {
	window.onresize = () => {
		isDesktop.value = checkIsDesktop()
	}
})

onUnmounted(() => {
	window.onresize = null
})
</script>

<template>
	<div class="titlebar">
		<div class="titlebar-content">
			<div class="titlebar-title">
				<IconButton v-if="backlink" :to="{ name: backlink.to }" icon="arrow_back" />
				<div class="titlebar-title-info">
					<h2 class="titlebar-title-info-text">{{ title }}</h2>
					<div v-if="$slots['titlebar-subtitle']" class="titlebar-subtitle">
						<slot name="titlebar-subtitle" />
					</div>
				</div>
			</div>
		</div>
		<div class="titlebar-actions">
			<div v-if="secondaryActions?.length" class="titlebar-actions-secondary">
				<template v-if="secondaryActions?.length == 1">
					<Button
						v-for="(item, index) in secondaryActions"
						:key="index"
						:class="item.class"
						variant="plain"
						:label="getButtonLabel(item.label, item.leadingIcon)"
						:to="item.to"
						:leading-icon="item.leadingIcon"
						@click="item.onAction" />
				</template>

				<Dropdown v-else right>
					<template #button-content>
						<Button
							:label="getButtonLabel('Mais ações', moreBtnMobileIcon)"
							:trailingIcon="isDesktop ? 'expand_more' : moreBtnMobileIcon" />
					</template>
					<DropdownItemButton
						v-for="(item, index) in secondaryActions"
						:key="index"
						:label="item.label"
						@click="item.onAction"
						:leading-icon="item.leadingIcon"
						:class="item.class" />
				</Dropdown>
			</div>
			<div v-if="primaryAction" class="titlebar-actions-primary">
				<Button
					variant="primary"
					:to="primaryAction.to"
					:label="getButtonLabel(primaryAction.label, primaryAction.leadingIcon)"
					@click="primaryAction.onAction"
					:class="primaryAction.class"
					:leading-icon="primaryAction.leadingIcon" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Titlebar.scss';
</style>
