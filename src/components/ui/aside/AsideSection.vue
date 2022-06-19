<script setup lang="ts">
import Link from '../link/Link.vue'
defineProps<{
	title?: string
	actions?: Array<{
		label: string
		onAction(): void
	}>
}>()
</script>

<template>
	<div class="ui-aside-section">
		<div class="ui-aside-section-header" v-if="title">
			<h6 class="ui-aside-section-title">
				{{ title }}
			</h6>
			<div class="ui-aside-section-actions" v-if="actions">
				<Link v-for="item in actions" :key="item.label" @click="item.onAction">
					{{ item.label }}
				</Link>
			</div>
		</div>
		<slot />
	</div>
</template>
