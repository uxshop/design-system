<script setup lang="ts">
import { watch } from 'vue'
import CustomScroll from '../../../ui/custom-scroll/CustomScroll.vue'
import Tab from '../../../ui/tab/Tab.vue'
import TabItem from '../../../ui/tab/TabItem.vue'

const props = defineProps<{
	queryParams?: Record<string, any>
	state: any
}>()

const setPresetFilter = (item: Record<string, any>, e: MouseEvent) => {
	e.preventDefault()
	e.stopPropagation()
	const params = item.filter

	if (item.id) {
		params.selectedView = item.view
	} else if (item.view) {
		params.selectedView = item.view
	}

	props.state.resetQueryParams(params)
	props.state.currentTab = item
}

const resetFilters = () => {
	props.state.resetQueryParams({ selectedView: 'all' })
}

watch(
	() => props.state.queryParams,
	(newVal) => {
		props.state.currentTab = newVal.selectedView || 'all'
	},
	{ deep: true, immediate: true }
)
</script>

<template>
	<CustomScroll
		class="table-list-tabs scroll-area"
		:settings="{
			maxScrollbarLength: 80,
			useBothWheelAxes: true,
			suppressScrollY: true
		}">
		<Tab v-model="state.currentTab" class="table-list-tabs-content">
			<TabItem label="Todos" @click="resetFilters" index="all" />
			<TabItem
				v-for="(item, index) in state.tabs"
				:key="index"
				@click="setPresetFilter(item, $event)"
				:index="item.view">
				{{ item.name }}
			</TabItem>
		</Tab>
	</CustomScroll>
</template>

<style lang="scss">
@import './TableListTabs.scss';
</style>
