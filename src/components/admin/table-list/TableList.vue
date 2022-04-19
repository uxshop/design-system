<script setup lang="ts">
import TableListTabs from './TableListTabs.vue'
import TableListNav from './table-list-nav/TableListNav.vue'
import TableListTable from './TableListTable.vue'
import { useRoute } from 'vue-router'
import { onMounted, watch, ref, useSlots } from 'vue'
import { union, clone, omit } from 'lodash-es'
import HistoryReplaceState from '../../../services/HistoryReplaceState'
import LocalStorageService from '../../../services/LocalStorageService'
import TableListEmptySearch from './TableListEmptySearch.vue'
import TableListEmptyMessage from './TableListEmptyMessage.vue'
import TableListNavBulk from './table-list-nav/TableListNavBulk.vue'
import TableListNavRefresh from './table-list-nav/TableListNavRefresh.vue'
import TableListNavSearch from './table-list-nav/TableListNavSearch.vue'
import TableListNavPagination from './table-list-nav/TableListNavPagination.vue'
import TableListNavFilter from './table-list-nav/TableListNavFilter.vue'
import type { ITableListConfig } from './types/ITableListConfig'
import SkeletonTable from '../../ui/skeleton-table/SkeletonTable.vue'
import Skeleton from '../../ui/skeleton/Skeleton.vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import type { TApiData } from 'src/types/IApiResource'

type TQueryParams = Record<string, string | number>

const props = defineProps<{
	config: ITableListConfig
	filters?: any
}>()

const emit = defineEmits<{
	(event: 'clickRow', i: Record<string, string>): void
}>()

const rows = ref<TApiData[]>([])
const scrollLeft = ref(false)
const selected = ref<number[]>([])
const firstGet = ref(false)
const noData = ref(false)
const omitFilters = ref({})
const queryParams = ref<TQueryParams>({})
const route = useRoute()
const slots = useSlots()
const term = ref()
const loading = ref(false)
const meta = ref({})
const cfg = Object.assign({ actions: ['remove', 'active'], hideCheckbox: false }, props.config)
const storageNameFilters = `adm_table_filters_${String(route.name)}`
const queryDefault = Object.assign(
	{
		sort: '-id',
		page: 1,
		limit: 25
	},
	props.config.queryParams
)

let omitFiltersValues = ['page', 'sort', '_', 'limit', 'selectedView', 'customFilterId']

const removeFilter = (key: string) => {
	delete queryParams.value[key]
	delete queryParams.value['customFilterId']
	queryParams.value.selectedView = 'all'
}

const setUrlParams = (query: TQueryParams) => HistoryReplaceState(query, ['_', 'limit'])
const setQueryParams = (params: TQueryParams) => {
	queryParams.value = Object.assign({}, queryParams.value, params)
}
const resetQueryParams = (params = {}) => {
	term.value = null
	queryParams.value = Object.assign(clone(queryDefault), params)
}

const init = async () => {
	// store.dispatch('noLoader', firstGet.value)
	const params = queryParams.value
	selected.value = []
	loading.value = true
	omitFilters.value = omit(params, omitFiltersValues)
	setUrlParams(params)

	LocalStorageService.setObj(storageNameFilters, params)

	const res = await props.config.service.get(params)
	meta.value = res.meta
	rows.value = res.data

	noData.value = Object.keys(omitFilters.value).length === 0 && !params.q && !res.data.length
	loading.value = false

	onGet(res.data)

	setTimeout(() => {
		// store.dispatch('noLoader', false)
	}, 250)
}

const checkAll = (val: boolean) => {
	if (val && rows.value) {
		const data: number[] = []
		rows.value.forEach((item: any) => {
			data.push(Number(item.id))
		})
		selected.value = data
	} else {
		selected.value = []
	}
}

const deleteOne = async (item: Record<string, number>) => {
	if (props.config.remove) {
		await props.config.remove(item)
	} else {
		await props.config.service.delete(Number(item.id))
	}

	init()
}

const activeOne = (item: Record<string, number>, active: boolean) => {
	return props.config.service.update(Number(item.id), { active: active })
}

const onGet = (data: TApiData[]) => {
	firstGet.value = true

	if (props.config.onGet && typeof props.config.onGet === 'function') {
		props.config.onGet(data)
	}
}

const clickRow = (item: Record<string, string>) => emit('clickRow', item)
const onScrollHorizontal = (e: UIEvent) => {
	const target = e.target as HTMLDivElement
	return (scrollLeft.value = target.scrollLeft > 10)
}
const unshiftItem = (item: Record<string, string>) => {
	if (rows.value) {
		rows.value.unshift(item)
	}
}
const activeInactiveSelecteds = async (val: boolean) => {
	for (const itemId of selected.value) {
		await activeOne({ id: itemId }, val)
	}

	init()
}

const removeSelecteds = async () => {
	for (const itemId of selected.value) {
		await deleteOne({ id: itemId })
	}

	init()
}

onMounted(() => {
	omitFiltersValues = union(omitFiltersValues, props.config.omitFilters)

	if (LocalStorageService.getObj(storageNameFilters)) {
		queryParams.value = LocalStorageService.getObj(storageNameFilters) as TQueryParams
	} else {
		queryParams.value = Object.assign(clone(queryDefault), clone(useRoute().query)) as TQueryParams
	}
})

watch(
	() => queryParams.value,
	(newVal) => {
		if (newVal.q) {
			term.value = newVal.q
		} else {
			term.value = null
		}

		if (!newVal.selectedView && !newVal.customFilterId) {
			newVal.selectedView = 'all'
		}

		init()
	}
)
const haveSlot = (name: string) => {
	return !!slots[name]
}

defineExpose({
	unshiftItem: unshiftItem,
	refresh: init
})
</script>

<template>
	<div class="table-list-skeleton" v-if="loading && !firstGet">
		<div class="tabs">
			<div style="margin: 20px 10px">
				<Skeleton width="100px" />
			</div>
		</div>
		<SkeletonTable cols="3" rows="6" with-action />
	</div>
	<TableListEmptyMessage v-if="!loading && noData" :msg="config.empty" />
	<div class="table-list" v-show="firstGet" v-else>
		<TableListTabs v-if="rows.length" :presetFilters="config.presetFilters" :hideCheckbox="config.hideCheckbox" />
		<TableListNav
			v-if="rows.length"
			v-model:selected="selected"
			v-model:noData="noData"
			:config="cfg"
			:meta="meta"
			:loading="loading"
			:rows="rows"
			:set-query-params="setQueryParams"
			:remove-filter="removeFilter"
			:query-params="queryParams"
			:filters="cfg.filters"
			@checkAll="checkAll"
			@refresh="init"
			@remove-selecteds="removeSelecteds"
			@active-selecteds="activeInactiveSelecteds(true)"
			@inactive-selecteds="activeInactiveSelecteds(false)"
			@reset-query-params="resetQueryParams">
			<TableListNavBulk
				@checkAll="checkAll"
				@refresh="init"
				@active="activeInactiveSelecteds(true)"
				@inactive="activeInactiveSelecteds(false)"
				@remove="removeSelecteds"
				:selected="selected"
				:config="cfg"
				:rows="rows" />
			<TableListNavRefresh @refresh="init" />
			<TableListNavSearch
				v-bind:model-value="term"
				@refresh="init"
				:placeholder="cfg.placeholder"
				:remove-filter="removeFilter"
				:set-query-params="setQueryParams" />
			<!-- <TableListNavCustomFilter
					v-if="$refs.tabs"
					:currentTab="$refs.tabs.currentTab"
					:queryParams="queryParams"
					:tabs="$refs.tabs.tabs"
					:omitFilters="omitFilters"
					@remove-tab="$refs.tabs.removeTab"
					@add-tab="$refs.tabs.addTab"
				/> -->
			<!-- <table-list-nav-sortable :configSortable="config.sortable" :queryParams="queryParams" /> -->
			<TableListNavFilter :filters="cfg.filters" @reset-query-params="resetQueryParams" />
			<TableListNavPagination :meta="meta" :queryParams="queryParams" :setQueryParams="setQueryParams" />
		</TableListNav>
		<div class="table-list-wrapper" @scroll="onScrollHorizontal" :class="{ '-scroll': scrollLeft }">
			<TableListEmptySearch v-show="!rows.length && !loading" @resetQueryParams="resetQueryParams" />
			<TableListTable
				v-model:selected="selected"
				:rows="rows"
				:actions="cfg.actions"
				:hideCheckbox="cfg.hideCheckbox"
				:loading="loading"
				@clickRow="clickRow"
				@delete="deleteOne"
				@toggleActive="activeOne">
				<template #head v-if="haveSlot('head')">
					<slot name="head" />
				</template>
				<template #default="{ item }">
					<slot :item="item" />
				</template>
			</TableListTable>
		</div>
	</div>
</template>

<style lang="scss">
@import './TableList.scss';
</style>
