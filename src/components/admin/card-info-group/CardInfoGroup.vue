<script setup lang="ts">
import './CardInfoGroup.scss'
import { ref } from 'vue'
import CardInfoGroupItem from './CardInfoGroupItem.vue'

const props = defineProps<{
	wrap?: string
	infos?: { text: string; value: string }[]
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
