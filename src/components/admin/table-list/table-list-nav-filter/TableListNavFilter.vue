<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../../ui/icon/Icon.vue'
import IconButton from '../../../ui/icon-button/IconButton.vue'
import { each } from 'lodash-es'
import TableListNavFilterSidebar from './TableListNavFilterSidebar.vue'
import Button from '../../../ui/button/Button.vue'

defineProps<{
	filters?: Record<string, string> | null
	currentFilters?: any
}>()
const emit = defineEmits(['resetQueryParams'])

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

	emit('resetQueryParams', current)
	filterSidebarRef.value.open()
}
</script>

<template>
	<span class="table-list-nav-item" v-if="filters">
		<!-- <IconButton class="table-list-nav-btn" @click="filterSidebarRef.open()" icon="tune" size="sm" /> -->
		<Button size="sm" label="Filtrar" @click="filterSidebarRef.open()" class="table-list-nav-btn" />
		<TableListNavFilterSidebar
			ref="filterSidebarRef"
			size="sm"
			@close="closeFilter"
			:filters="filters"
			:currentFilters="currentFilters" />
	</span>
</template>
