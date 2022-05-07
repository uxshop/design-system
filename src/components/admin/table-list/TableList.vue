<script setup lang="ts">
import TableListTabs from './snippets/TableListTabs.vue'
import TableListNav from './table-list-nav/TableListNav.vue'
import TableListTable from './snippets/TableListTable.vue'
import { useRoute } from 'vue-router'
import { onMounted, watch, ref, useSlots } from 'vue'
import { union, clone, omit } from 'lodash-es'
import HistoryReplaceState from '../../../services/HistoryReplaceState'
import LocalStorageService from '../../../services/LocalStorageService'
import TableListEmptySearch from './snippets/TableListEmptySearch.vue'
import TableListEmptyMessage from './snippets/TableListEmptyMessage.vue'
import TableListNavBulk from './table-list-nav-bulk/TableListNavBulk.vue'
import TableListNavRefresh from './table-list-nav/TableListNavRefresh.vue'
import TableListNavSearch from './table-list-nav/TableListNavSearch.vue'
import TableListNavPagination from './table-list-nav-pagination/TableListNavPagination.vue'
import TableListNavFilter from './table-list-nav-filter/TableListNavFilter.vue'
import SkeletonTable from '../../ui/skeleton-table/SkeletonTable.vue'
import type { ITableListConfig } from './types/ITableListConfig'
import type { TApiData } from 'src/types/IApiResource'
import Card from '../../ui/card/Card.vue'
import TableListNavSortable from './table-list-nav/TableListNavSortable.vue'
import TableListTags from './table-list-tags/TableListTags.vue'
import TableListNavCustomFilter from './table-list-nav/TableListNavCustomFilter.vue'
// import TableListNavCustomFilter from './table-list-nav/TableListNavCustomFilter.vue'

type TQueryParams = Record<string, string | number>

const props = defineProps<{
	config: ITableListConfig
	filters?: any
	placeholder?: string
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
	console.log(params)

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

// watch(
// 	() => props.config.presetFilters,
// 	(newVal) => {
// 		console.log(newVal)
// 	}
// )

defineExpose({
	unshiftItem: unshiftItem,
	refresh: init
})
</script>

<template>
	<Card class="table-list-skeleton" v-if="loading && !firstGet">
		<SkeletonTable cols="3" rows="6" withAction hideHeader />
	</Card>
	<TableListEmptyMessage v-if="!loading && noData" :msg="config.empty" />
	<div class="table-list" v-show="firstGet" v-else>
		<TableListTabs
			:presetFilters="config.presetFilters"
			:hideCheckbox="config.hideCheckbox"
			:setQueryParams="setQueryParams"
			@resetQueryParams="resetQueryParams" />
		<TableListNav
			v-model:selected="selected"
			v-model:noData="noData"
			:config="cfg"
			:meta="meta"
			:loading="loading"
			:rows="rows"
			:setQueryParams="setQueryParams"
			:removeFilter="removeFilter"
			:queryParams="queryParams"
			:filters="cfg.filters"
			@checkAll="checkAll"
			@refresh="init"
			@removeSelecteds="removeSelecteds"
			@activeSelecteds="activeInactiveSelecteds(true)"
			@inactiveSelecteds="activeInactiveSelecteds(false)"
			@resetQueryParams="resetQueryParams">
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
				v-model="term"
				@refresh="init"
				:placeholder="cfg.placeholder"
				:removeFilter="removeFilter"
				:setQueryParams="setQueryParams" />
			<TableListNavCustomFilter :queryParams="queryParams" :omitFilters="omitFilters" />
			<TableListNavSortable :sortable="cfg.sortable" :queryParams="queryParams" :setQueryParams="setQueryParams" />
			<TableListNavFilter :filters="cfg.filters" :currentFilters="omitFilters" @resetQueryParams="resetQueryParams" />
			<TableListNavPagination :meta="meta" :queryParams="queryParams" :setQueryParams="setQueryParams" />
		</TableListNav>
		<TableListTags :filters="cfg.filters" :omitFilters="omitFilters" />
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
				<template #head v-if="$slots.head">
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
