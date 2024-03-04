<script setup lang="ts">
import Link from '../link/Link.vue'
import type { IAction } from '../../../types/IAction'

defineProps<{
	title?: string
	actions?: IAction[]
}>()
</script>

<template>
	<div class="ui-card-section">
		<div class="ui-card-section-header" v-if="title">
			<h6 class="ui-card-section-title">
				{{ title }}
			</h6>
			<div class="ui-card-section-actions" v-if="actions">
				<Link v-for="item in actions" :key="item.label" @click="item.onAction">
					{{ item.label }}
				</Link>
			</div>
		</div>
		<div class="ui-card-section-content">
			<slot />
		</div>
	</div>
</template>
