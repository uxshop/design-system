<script setup lang="ts">
import StatsItem from '../../ui/stats-item/StatsItem.vue'

const props = defineProps<{
	infos?: {
		label: string
		value: string
		primaryAction?: { text: string; to?: object; href?: string; button?: boolean }[]
		text: string
	}[]
}>()
</script>

<template>
	<div class="stats-group">
		<div class="stats-group-wrapper" v-if="infos">
			<StatsItem
				v-for="item in infos"
				:key="item.label"
				:value="item.value"
				:label="item.label"
				:primaryAction="item.primaryAction"
				:text="item.text" />
			<slot />
		</div>
		<div class="stats-group-wrapper" v-else>
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './StatsGroup.scss';
</style>
