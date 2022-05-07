<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import type { TabProviderInterface } from './TabProviderInterface'

const props = defineProps<{
	label?: string
	index?: string
}>()

const tabsProvider: TabProviderInterface | undefined = inject('tabs')
const active = ref(false)
const _index = props.index || tabsProvider?.tabs.length

const onClick = (evt: MouseEvent) => {
	if (tabsProvider) {
		tabsProvider.active(_index, evt)
	}
}

if (tabsProvider) {
	tabsProvider.tabs.push(_index)
}

watchEffect(() => {
	if (tabsProvider?.activeTabIndex == _index) {
		active.value = true
	} else {
		active.value = false
	}
})
</script>

<template>
	<button class="ui-tab-item" :class="{ '-active': active }" @click="onClick">
		<span class="ui-tab-item-content">
			<slot>{{ label }}</slot>
		</span>
	</button>
</template>

<style lang="scss">
@import './TabItem.scss';
</style>
