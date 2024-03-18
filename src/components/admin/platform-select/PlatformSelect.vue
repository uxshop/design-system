<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import PlatformSelectModal from './PlatformSelectModal.vue'
import type { IPlatform } from './PlatformSelectTypes'
import type { Item } from 'choices.js'

export type { IPlatform } from './PlatformSelectTypes'

const props = defineProps<{ organization: string; platform: string; platformsList: IPlatform[] }>()
const emits = defineEmits(['change:platform'])

const platformSelectModalRef = ref<InstanceType<typeof PlatformSelectModal>>()

const onChosenPlatform = (item: Item) => {
	emits('change:platform', item)
	platformSelectModalRef.value?.close()
}

const openSelectModal = () => {
	platformSelectModalRef.value?.open(props.platformsList)
}
</script>

<template>
	<div class="platform-select-container" @click="openSelectModal">
		<div class="logo-container">
			<slot name="logo" />
		</div>
		<div class="plaform-container">
			<span>{{ organization }}</span>
			<span class="platform-name">{{ platform }}</span>
		</div>
		<div class="icon-select-container">
			<Icon name="expand_less"></Icon>
			<Icon name="expand_more"></Icon>
		</div>
	</div>
	<PlatformSelectModal @on-chosen-platform="onChosenPlatform" ref="platformSelectModalRef" />
</template>

<style lang="scss">
@import './PlatformSelect.scss';
</style>
