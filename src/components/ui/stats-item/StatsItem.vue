<script setup lang="ts">
import TextStyle from '../text-style/TextStyle.vue'
import Icon from '../../ui/icon/Icon.vue'
import Link from '../../ui/link/Link.vue'
import Button from '../button/Button.vue'
import vTooltip from '../../../directives/tooltip'

defineProps<{
	label?: string
	value?: string | number
	perc?: string | number
	info?: string
	primaryAction?: { text: string; to?: object; href?: string; button?: boolean }[]
	text?: string
}>()

const isMobile = window.innerWidth <= 768
</script>

<template>
	<div class="ui-stats-item">
		<small class="ui-stats-item-label">
			{{ label }}
			<icon name="info" v-if="info" v-tooltip:top="info" />
		</small>
		<span class="ui-stats-item-value">{{ value }}</span>

		<div class="stats-perc" v-if="perc != undefined" :class="{ positive: Number(perc) > 0 }">
			<icon name="south" />
			<icon name="north" />
			<span>{{ perc }}%</span>
		</div>

		<small v-if="text" v-text="text" />

		<small class="stats-action" v-if="primaryAction" v-for="item in primaryAction" :key="item.text">
			<Button
				v-if="item.button == true"
				:label="item.text"
				:href="item.href"
				:to="item.to"
				size="sm"
				variant="primary" />
			<Link v-else :label="item.text" :href="item.href" :to="item.to" />
		</small>

		<slot />
	</div>
</template>

<style lang="scss">
@import './StatsItem.scss';
</style>
