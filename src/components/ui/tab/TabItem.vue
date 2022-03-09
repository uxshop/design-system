<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'

const tabsProvider = inject('tabs')
const active = ref(false)
const index = tabsProvider.tabs.length

const onClick = (evt) => {
	tabsProvider.active(index, evt)
}

tabsProvider.tabs.push(index)

watchEffect(() => {
	if (tabsProvider.activeTabIndex == index) {
		active.value = true
	} else {
		active.value = false
	}
})
</script>

<template>
	<button class="ui-tab-item" :class="{ '-active': active }" @click="onClick">
		<span class="ui-tab-item-area"></span>
		<span>
			<slot />
		</span>
		<span class="ui-tab-item-indicator"></span>
	</button>
</template>

<style lang="scss">
@import './TabItem.scss';
</style>
