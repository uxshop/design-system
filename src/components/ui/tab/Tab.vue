<script setup lang="ts">
import { getCurrentInstance, provide, reactive, watchEffect } from 'vue'
import type { TabProviderInterface } from './TabProviderInterface'

const props = defineProps<{
	modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])
const uid = `ui-tab-${getCurrentInstance()?.uid}`

const state = reactive<TabProviderInterface>({
	tabs: [],
	activeTabIndex: props.modelValue,
	active: (index: number, evt: MouseEvent) => {
		emit('update:modelValue', index)

		const ele: HTMLElement | null = document.getElementById(uid)

		if (ele && ele.offsetWidth + ele.scrollLeft > evt.clientX - evt.offsetX) {
			const scroll = evt.clientX - evt.offsetX
			ele.scrollTo({ left: scroll, behavior: 'smooth' })
		}
	}
})

provide('tabs', state)

watchEffect(() => {
	state.activeTabIndex = props.modelValue
})
</script>

<template>
	<div class="ui-tab" :id="uid">
		<slot />
	</div>
</template>

<style lang="scss">
@import './Tab.scss';
</style>
