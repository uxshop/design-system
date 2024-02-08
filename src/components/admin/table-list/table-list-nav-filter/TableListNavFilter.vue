<script setup lang="ts">
import { ref } from 'vue'
import { each } from 'lodash-es'
import TableListNavFilterSidebar from './TableListNavFilterSidebar.vue'
import Button from '../../../ui/button/Button.vue'
import type { ITableListState } from '../types/ITableListState'

const props = defineProps<{
	state: ITableListState
}>()

const filterSidebarRef = ref()

const closeFilter = (resFilters: Record<string, any>) => {
	const current: Record<string, any> = {}
	each(resFilters, (val, key) => {
		if (val == null || (Array.isArray(val) && val.length == 0)) {
			return
		}

		if (Array.isArray(val)) {
			current[key] = val.join(',')
		} else {
			current[key] = val
		}
	})

	props.state.resetQueryParams(current)
	filterSidebarRef.value.open()
}
</script>

<template>
	<span class="table-list-nav-item" v-if="props.state.config.filters">
		<Button label="Filtros" @click="filterSidebarRef.open()" class="table-list-nav-btn" />
		<TableListNavFilterSidebar
			ref="filterSidebarRef"
			@close="closeFilter"
			:filters="props.state.config.filters"
			:currentFilters="state.omitFilters" />
	</span>
</template>
