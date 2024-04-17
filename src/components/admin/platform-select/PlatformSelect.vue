<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import Tab from '../../ui/tab/Tab.vue'
import TabItem from '../../ui/tab/TabItem.vue'
import type { IPlatform } from './PlatformSelectTypes'
export type { IPlatform } from './PlatformSelectTypes'

interface PlatformSelectProps {
	platformsList: IPlatform[]
}

const props = defineProps<PlatformSelectProps>()

const tab = ref(props.platformsList.find((item) => item.active)?.key)

const emits = defineEmits(['change:platform'])

const onChangeTab = (platform: IPlatform) => {
	emits('change:platform', platform)
}
</script>

<template>
	<Tab v-model="tab" class="tab-container">
		<TabItem
			v-for="platform in platformsList"
			:label="platform.name"
			:index="platform.key"
			@click="onChangeTab(platform)">
			<div class="tab-item-container">
				<Icon :name="platform.icon" />
				<span>{{ platform.name }}</span>
			</div>
		</TabItem>
	</Tab>
</template>

<style lang="scss">
@import './PlatformSelect.scss';
</style>
