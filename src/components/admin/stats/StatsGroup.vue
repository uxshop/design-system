<script setup lang="ts">
import { ref } from 'vue'
import StatsItem from './StatsItem.vue'

const props = defineProps<{
	wrap?: string
	infos?: { text: string; value: string }[]
}>()

const classList = ref<string[]>([])

if (props.wrap) {
	classList.value.push(`-wrap${props.wrap}`)
}
</script>

<template>
	<div class="stats-group" :class="classList">
		<div class="stats-group-wrapper" v-if="infos">
			<StatsItem v-for="item in infos" :key="item.text" :value="item.value" :text="item.text" />
		</div>
		<div class="stats-group-wrapper" v-else>
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './StatsGroup.scss';
</style>
