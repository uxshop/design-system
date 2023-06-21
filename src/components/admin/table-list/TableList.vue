<script setup lang="ts">
import { onMounted, watch, ref, reactive, onBeforeMount } from 'vue'
import { union, clone, omit, concat, isEqual } from 'lodash-es'
import { useRoute } from 'vue-router'
import HistoryReplaceState from '../../../services/HistoryReplaceState'
import LocalStorage from '../../../services/LocalStorage'
import SkeletonTable from '../../ui/skeleton-table/SkeletonTable.vue'
import FormValidation from '../../ui/form-validation/FormValidation.vue'
import Card from '../../ui/card/Card.vue'
import TableListNav from './table-list-nav/TableListNav.vue'
import TableListTags from './table-list-tags/TableListTags.vue'
import TableListTabs from './table-list-tabs/TableListTabs.vue'
import TableListTable from './table-list-table/TableListTable.vue'
import TableListNavSearch from './table-list-nav/TableListNavSearch.vue'
import TableListNavBulk from './table-list-nav-bulk/TableListNavBulk.vue'
import TableListNavRefresh from './table-list-nav/TableListNavRefresh.vue'
import TableListNavSortable from './table-list-nav/TableListNavSortable.vue'
import TableListNavFilter from './table-list-nav-filter/TableListNavFilter.vue'
import TableListNavCustomFilter from './table-list-nav/TableListNavCustomFilter.vue'
import TableListNavPagination from './table-list-nav-pagination/TableListNavPagination.vue'
import TableListEmptySearch from './snippets/TableListEmptySearch.vue'
import TableListEmptyMessage from './snippets/TableListEmptyMessage.vue'
import type { TApiData } from 'src/types/IApiResource'
import type { ITableListConfig } from 'src/types'

type TQueryParams = Record<string, string | number>

const props = defineProps<{
	config: ITableListConfig
	filters?: any
	placeholder?: string
	to?: any
}>()

const emit = defineEmits<{
	(event: 'clickRow', i: any): void
	(event: 'emptyData'): void
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
const formError = ref<Record<string, string> | null>(null)
const hasQueryParams = ref()
const queryDefault = Object.assign(
	{
		sort: '-id',
		page: '1',
		limit: 25,
		selectedView: 'all'
	},
	props.config.queryParams
)

let omitFiltersValues = concat(
	['page', 'sort', '_', 'limit', 'selectedView', 'customFilterId'],
	props.config.omitFiltersValues
)

const removeFilter = (key: string) => {
	delete queryParams.value[key]
	delete queryParams.value['customFilterId']
	queryParams.value.selectedView = 'all'
	setQueryParams(queryParams.value)
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

const emitNoFilteredData = () => emit('emptyData')

const fetchData = async () => {
	const params = clone(queryParams.value)
	selected.value = []
	loading.value = true
	omitFilters.value = omit(params, omitFiltersValues)
	setUrlParams(params)

	LocalStorage.setObj(storageNameFilters, params)

	const res = await props.config.service.get(params)
	if (!res.data.length && isEqual(queryDefault, omit(params, '_'))) emitNoFilteredData()
	meta.value = res.meta
	rows.value = res.data

	noData.value = Object.keys(omitFilters.value).length === 0 && !params.q && !res.data.length
	loading.value = false

	onGet(res.data)
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

	fetchData()
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

const activeInactiveSelected = async (val: boolean) => {
	for (const itemId of selected.value) {
		await activeOne({ id: itemId }, val)
	}

	fetchData()
}

const removeSelected = async () => {
	try {
		for (const itemId of selected.value) {
			await deleteOne({ id: itemId })
		}
	} catch (error) {
		formError.value = {
			erro: [error.data.error]
		}
	}

	fetchData()
}

const assignDefaultQueryParams = () => {
	return Object.assign(clone(queryDefault), clone(useRoute().query)) as TQueryParams
}

onBeforeMount(() => {
	hasQueryParams.value = route.query.sort
})

onMounted(() => {
	omitFiltersValues = union(omitFiltersValues, props.config.omitFilters)
	const localStorageParams = LocalStorage.getObj(storageNameFilters) as TQueryParams

	if (!hasQueryParams.value && localStorageParams) {
		queryParams.value = Object.assign(localStorageParams)
	} else {
		queryParams.value = assignDefaultQueryParams()
	}
})

let timerQ: ReturnType<typeof setTimeout>

watch(
	() => queryParams.value,
	(newVal: any, oldVal) => {
		clearTimeout(timerQ)
		if (newVal != oldVal) {
			timerQ = setTimeout(() => {
				if (newVal.q) {
					state.term = newVal.q
				}

				if (!newVal.selectedView && !newVal.customFilterId) {
					newVal.selectedView = 'all'
				}

				fetchData()
			}, 100)
		}
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
	fetchData: fetchData,
	checkAll: checkAll,
	setQueryParams: setQueryParams,
	resetQueryParams: resetQueryParams,
	removeFilter: removeFilter,
	removeSelected: removeSelected,
	toggleActiveSelected: activeInactiveSelected,
	activeOne: activeOne,
	deleteOne: deleteOne,
	clickRow: clickRow
})

defineExpose({
	unshiftItem: unshiftItem,
	refresh: fetchData
})
</script>

<template>
	<FormValidation v-model="formError" />
	<Card v-if="loading && !firstGet" class="table-list-skeleton" noPadding>
		<SkeletonTable cols="3" rows="6" withAction="1" />
	</Card>
	<TableListEmptyMessage v-if="!loading && noData" :msg="config.empty" />
	<div v-else class="table-list" v-show="firstGet">
		<TableListTabs :state="state" />
		<TableListNav :loading="loading">
			<TableListNavBulk :state="state" :selected="selected" :config="cfg" :rows="rows" />
			<TableListNavRefresh :state="state" />
			<TableListNavSearch @refresh="fetchData" :placeholder="cfg.placeholder" :state="state" />
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
			<TableListTable v-model:selected="selected" :rows="rows" :state="state" :to="to">
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
