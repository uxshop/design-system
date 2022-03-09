<script setup lang="ts">
import { getCurrentInstance, provide, reactive, watchEffect } from 'vue'

const props = defineProps<{
	modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

const uid = `ui-tab-${getCurrentInstance()?.uid}`

const state = reactive({
	tabs: [],
	activeTabIndex: props.modelValue,
	active: (index: any, evt: { clientX: number; layerX: number }) => {
		emit('update:modelValue', index)

		const ele = document.getElementById(uid)
		// const elePos = evt.offsetX - evt.target.
		// console.log(ele.scrollWidth, ele.offsetWidth, ele.scrollLeft, evt)
		// console.log(evt.clientX - evt.layerX)
		if (ele.offsetWidth + ele.scrollLeft > evt.clientX - evt.layerX) {
			const scroll = evt.clientX - evt.layerX
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
