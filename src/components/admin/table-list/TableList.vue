<script setup lang="ts">
import TableListTabs from './snippets/TableListTabs.vue'
import TableListNav from './table-list-nav/TableListNav.vue'
import TableListTable from './snippets/TableListTable.vue'
import { useRoute } from 'vue-router'
import { onMounted, watch, ref, reactive } from 'vue'
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

type TQueryParams = Record<string, string | number>

const props = defineProps<{
	config: ITableListConfig
	filters?: any
	placeholder?: string
}>()

const emit = defineEmits<{
	(event: 'clickRow', i: any): void
}>()

const rows = ref<TApiData[]>([])
const scrollLeft = ref(false)
const selected = ref<number[]>([])
const firstGet = ref(false)
const noData = ref(false)
const omitFilters = ref({})
const queryParams = ref<TQueryParams>({})
const route = useRoute()
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
	const query = Object.assign({}, queryParams.value, { selectedView: 'all' }, params)
	queryParams.value = query
}

const resetQueryParams = (params = {}) => {
	state.term = null
	queryParams.value = Object.assign(clone(queryDefault), params)
}

const init = async () => {
	// store.dispatch('noLoader', firstGet.value)
	const params = clone(queryParams.value)
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

let timerQ: ReturnType<typeof setTimeout>

watch(
	() => queryParams.value,
	(newVal: any) => {
		clearTimeout(timerQ)
		timerQ = setTimeout(() => {
			console.log('queryParams', JSON.stringify(newVal))

			if (newVal.q) {
				state.term = newVal.q
			}

			if (!newVal.selectedView && !newVal.customFilterId) {
				newVal.selectedView = 'all'
			}

			init()
		})
	},
	{ deep: true }
)

const state = reactive({
	queryParams: queryParams,
	omitFilters: omitFilters,
	config: cfg,
	tabs: [],
	currentTab: {},
	term: null,
	omitFiltersValues: omitFiltersValues,
	init: init,
	checkAll: checkAll,
	setQueryParams: setQueryParams,
	resetQueryParams: resetQueryParams,
	removeFilter: removeFilter,
	removeSelecteds: removeSelecteds,
	toggleActiveSelecteds: activeInactiveSelecteds,
	activeOne: activeOne,
	deleteOne: deleteOne,
	clickRow: clickRow
})

defineExpose({
	unshiftItem: unshiftItem,
	refresh: init
})
</script>

<template>
	<Card v-if="loading && !firstGet" class="table-list-skeleton">
		<SkeletonTable cols="3" rows="6" withAction hideHeader />
	</Card>
	<TableListEmptyMessage v-if="!loading && noData" :msg="config.empty" />
	<div v-else class="table-list" v-show="firstGet">
		<TableListTabs :state="state" />
		<TableListNav :loading="loading">
			<TableListNavBulk :state="state" :selected="selected" :config="cfg" :rows="rows" />
			<TableListNavRefresh :state="state" />
			<TableListNavSearch @refresh="init" :placeholder="cfg.placeholder" :state="state" />
			<TableListNavCustomFilter
				v-if="config.customFilterService"
				:service="config.customFilterService"
				:state="state" />
			<TableListNavSortable :sortable="cfg.sortable" :queryParams="queryParams" :setQueryParams="setQueryParams" />
			<TableListNavFilter :state="state" />
			<TableListNavPagination :meta="meta" :state="state" />
		</TableListNav>

		<TableListTags :state="state" />

		<div class="table-list-wrapper" @scroll="onScrollHorizontal" :class="{ '-scroll': scrollLeft }">
			<TableListEmptySearch v-show="!rows.length && !loading" @resetQueryParams="resetQueryParams" />
			<TableListTable v-model:selected="selected" :rows="rows" :loading="loading" :state="state">
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
