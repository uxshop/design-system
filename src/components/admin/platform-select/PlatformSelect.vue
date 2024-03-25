<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import PlatformSelectModal from './PlatformSelectModal.vue'
import type { IPlatform } from './PlatformSelectTypes'
import type { Item } from 'choices.js'

export type { IPlatform } from './PlatformSelectTypes'

interface PlatformSelectProps {
	organization: string
	platform: string
	platformsList: IPlatform[]
	modalConfig?: { title: string; caption: string }
}

const props = defineProps<PlatformSelectProps>()

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
			<slot name="logo-icon" />
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
	<PlatformSelectModal
		@on-chosen-platform="onChosenPlatform"
		ref="platformSelectModalRef"
		:title="modalConfig?.title"
		:caption="modalConfig?.caption" />
</template>

<style lang="scss">
@import './PlatformSelect.scss';
</style>
