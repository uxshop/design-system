<script setup lang="ts">
import { ref, watch } from 'vue'
import { each, isObject } from 'lodash-es'
import { slugify } from '../../../../filters'
import CustomScroll from '../../../ui/custom-scroll/CustomScroll.vue'
import Tab from '../../../ui/tab/Tab.vue'
import TabItem from '../../../ui/tab/TabItem.vue'

interface TabInterface {
	name: string
	view: string
	filter: Record<string, any>
}

interface FilterInterface {
	name: string
	view: string
	filter: Record<string, any>
}

const props = defineProps<{
	presetFilters?: Record<string, any>
	queryParams?: Record<string, any>
}>()

const emit = defineEmits<{
	(e: 'resetQueryParams', val: any): void
	(e: 'setQueryParams', val: any): void
}>()

const tabs = ref<FilterInterface[]>([])
const modelTab = ref(0)

const setPresetFilter = (item: Record<string, any>) => {
	const params = item.filter

	if (item.view) {
		params.selectedView = item.view
	}

	if (item.id) {
		// this.$delete(this.$parent.queryParams, 'selectedView')
		// this.$set(this.$parent.queryParams, 'customFilterId', item.id)
	}

	emit('resetQueryParams', params)
}

const resetFilters = () => emit('resetQueryParams', { selectedView: 'all' })

const getCustomFilters = () => {
	console.log(props.presetFilters)

	const _tabs: any = []

	each(props.presetFilters, (item: FilterInterface | string) => {
		if (isObject(item)) {
			item.view = slugify(item.name)
			_tabs.push(item)
		}

		if (item == 'active') {
			_tabs.push({ name: 'Ativo', view: 'ativo', filter: { active: 1 } })
			_tabs.push({ name: 'Inativo', view: 'inativo', filter: { active: 0 } })
		}
	})

	tabs.value = _tabs
}

watch(() => props.presetFilters, getCustomFilters, { deep: true, immediate: true })
</script>

<template>
	<CustomScroll
		class="table-list-tabs scroll-area"
		:settings="{
			maxScrollbarLength: 80,
			useBothWheelAxes: true,
			suppressScrollY: true
		}">
		<Tab v-model="modelTab" class="table-list-tab">
			<TabItem label="Todos" @click="resetFilters" />
			<TabItem v-for="item in tabs" :label="item.name" :key="item.name" @click="setPresetFilter(item)" />
		</Tab>
	</CustomScroll>
</template>

<style lang="scss">
@import './TableListTabs.scss';
</style>
