<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
export interface Props {
	title?: string | null
	backlink?: { to: string }
}
defineProps<Props>()
</script>

<template>
	<div class="titlebar">
		<div class="titlebar-content">
			<div class="titlebar-title -mobile">
				<router-link :to="{ name: backlink.to }" v-if="backlink" class="titlebar-backlink">
					<Icon name="arrow_back" />
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
			<slot name="buttons" />
		</div>
	</div>
</template>

<style lang="scss">
@import './Titlebar.scss';
</style>
