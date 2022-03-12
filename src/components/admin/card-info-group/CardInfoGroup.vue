<script setup lang="ts">
import { ref } from 'vue'
import CardInfoGroupItem from './CardInfoGroupItem.vue'

const props = defineProps<{
	wrap: string
	infos: any[]
}>()

const classList = ref<string[]>([])

if (props.wrap) {
	classList.value.push(`card-info-group-wrap${props.wrap}`)
}
</script>

<template>
	<div class="card-info-group" :class="classList">
		<div class="card-info-group-wrapper" v-if="infos">
			<CardInfoGroupItem v-for="item in infos" :key="item.text" :value="item.value" :text="item.text" />
		</div>
		<div class="card-info-group-wrapper" v-else>
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './card-info-group.scss';
</style>
