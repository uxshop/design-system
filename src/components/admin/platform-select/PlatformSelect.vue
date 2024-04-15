<script setup lang="ts">
import { computed, ref } from 'vue'
import { startCase } from 'lodash-es'

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

const organizationName = computed(() => startCase(props.organization))
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
			<small>{{ organizationName }}</small>
			<span class="platform-name">{{ platform }}</span>
		</div>
		<div class="icon-select-container">
			<Icon size="24" name="unfold_more"></Icon>
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
