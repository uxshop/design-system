<script setup lang="ts">
import tooltip from '../../../directives/tooltip'
import Icon from '../../ui/icon/Icon.vue'

defineProps<{
	text?: string
	value?: undefined
	perc?: undefined
	info?: string
}>()

/* 	directives: { tooltip }, */
</script>

<template>
	<div class="card-info-item">
		<div class="card-info-content">
			<small class="card-info-text">
				{{ text }}
				<icon name="info" v-if="info" v-tooltip:top="info" />
			</small>
			<b class="card-info-value">{{ value }}</b>

			<div class="card-info-perc" v-if="perc != undefined" :class="{ positive: perc > 0 }">
				<icon name="south" />
				<icon name="north" />
				<span>{{ perc }}%</span>
			</div>
		</div>
	</div>
</template>
