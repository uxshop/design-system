<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../../../ui/icon/Icon.vue'
import IconButton from '../../..//ui/icon-button/IconButton.vue'
import each from 'lodash/each'
import TableListNavFilterSidebar from './TableListNavFilterSidebar.vue'

defineProps<{
	filters?: Record<string, string> | null
}>()
const emit = defineEmits(['resetQueryParams'])

const filterSidebarRef = ref()

const closeFilter = (resFilters: Record<string, any>) => {
	const currentFilters: Record<string, any> = {}
	each(resFilters, (val, key) => {
		if (val == null || (Array.isArray(val) && val.length == 0)) {
			return
		}

		if (Array.isArray(val)) {
			currentFilters[key] = val.join(',')
		} else {
			currentFilters[key] = val
		}
	})

	emit('resetQueryParams', currentFilters)
	filterSidebarRef.value.toggle()
}
</script>

<template>
	<span class="table-list-nav-item" v-if="filters" v-tooltip:top="`Filtrar registros`">
		<IconButton class="table-list-nav-btn" @click="filterSidebarRef.toggle()" icon="tune" size="sm" />
		<!-- <TableListNavFilterSidebar ref="filterSidebarRef" size="sm" @close="closeFilter" :filters="filters" /> -->
	</span>
</template>
