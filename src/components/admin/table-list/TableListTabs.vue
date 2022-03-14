<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { each, isObject } from 'lodash-es'
import { slugify } from '../../../filters'
import CustomScroll from '../../ui/custom-scroll/CustomScroll.vue'

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
	(e: 'resetQueryParams'): void
	(e: 'setQueryParams', val: any): void
}>()

const tabs = ref<FilterInterface[]>([])
const currentTab = ref<TabInterface | null>(null)

const setPresetFilter = (item: Record<string, any>) => {
	emit('resetQueryParams')

	if (item.view) {
		emit('setQueryParams', {
			selectedView: item.view
		})
	}

	if (item.id) {
		// this.$delete(this.$parent.queryParams, 'selectedView')
		// this.$set(this.$parent.queryParams, 'customFilterId', item.id)
	}
}

const resetFilters = () => {
	// this.$parent.resetQueryParams()
	// this.$parent.queryParams.selectedView = 'all'
	// this.$parent.term = null
}

const getCustomFilters = async () => {
	tabs.value = []

	each(props.presetFilters, (item: FilterInterface | string) => {
		if (isObject(item)) {
			item.view = slugify(item.name)
			tabs.value.push(item)
		}

		if (item == 'active') {
			tabs.value.push({ name: 'Ativo', view: 'ativo', filter: { active: 1 } })
			tabs.value.push({ name: 'Inativo', view: 'inativo', filter: { active: 0 } })
		}
	})

	// this.$api('/custom-filters')
	// 	.get({ resource: this.$parent.config.model.name })
	// 	.then((res) => {
	// 		tabs.value.push(...res.data)
	// 		this.getCurrentTab()
	// 	})
}

onMounted(() => {
	getCustomFilters()
})
</script>

<template>
	<CustomScroll
		class="table-list-tabs scroll-area"
		:settings="{
			maxScrollbarLength: 80,
			useBothWheelAxes: true,
			suppressScrollY: true
		}">
		<div class="table-list-tabs-item" :class="{ '-active': currentTab == null }" @click="resetFilters">Todos</div>
		<div
			class="table-list-tabs-item"
			@click="setPresetFilter(item)"
			v-for="item in tabs"
			:class="{ '-active': item == currentTab }"
			:key="item.name">
			{{ item.name }}
		</div>
	</CustomScroll>
</template>

<style lang="scss">
@import './TableListTabs.scss';
</style>
