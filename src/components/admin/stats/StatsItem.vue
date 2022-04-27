<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

defineProps<{
	text?: string
	value?: string | number
	perc?: string | number
	info?: string
}>()
</script>

<template>
	<div class="stats-item">
		<div class="stats-content">
			<small class="stats-text">
				{{ text }}
				<icon name="info" v-if="info" v-tooltip:top="info" />
			</small>
			<b class="stats-value">{{ value }}</b>

			<div class="stats-perc" v-if="perc != undefined" :class="{ positive: Number(perc) > 0 }">
				<icon name="south" />
				<icon name="north" />
				<span>{{ perc }}%</span>
			</div>
		</div>
	</div>
</template>
