<script setup lang="ts">
import { each, find, isFunction } from 'lodash-es'
import type { ITableListState } from '../types/ITableListState'
import Tag from '../../../ui/tag/Tag.vue'
import { computed } from '@vue/reactivity'
import { omit } from 'lodash-es'

const props = defineProps<{
	state: ITableListState
}>()

const removeFilter = props.state.removeFilter

const translateKey = (item: string) => {
	let val = item
	each(props.state.config.filters, (filter, key) => {
		if (item == key) {
			val = filter.name
		}
	})
	return val
}

const translateValue = (item: any, key: string) => {
	const val: string[] = []
	let values: number[] = []

	if (key == 'q') {
		return item
	}

	if (props.state.config.filters[key].type == 'browser') {
		let count = props.state.omitFilters[key].split(',').length
		let text = count == 1 ? 'filtro' : 'filtros'
		return `${count} ${text}`
	}

	if (['text', 'number'].indexOf(props.state.config.filters[key].type) >= 0) {
		return item
	}

	if (isNaN(item)) {
		values = item.split(',')
	} else {
		values = [item]
	}

	each(props.state.config.filters, (item, k) => {
		if (k == key) {
			if (isFunction(item.filters)) {
				item.filters = item.filters()
			}

			each(values, (v) => {
				if (!isNaN(v)) {
					v = Number(v)
				}

				const obj = find(item.filters, { value: v })
				if (obj) {
					val.push(obj.name)
				}
			})
		}
	})

	return val.join(', ')
}

const showTags = computed(() => {
	const filters = omit(props.state.omitFilters, ['q'])
	return filters.length > 0
})
</script>

<template>
	<div class="table-list-tags" v-if="showTags">
		<span v-for="(item, key) in state.omitFilters" v-show="String(key) != 'q'" :key="item" class="table-list-tags-item">
			<Tag variant="dark" @remove="removeFilter(String(key))" class="mr-1">
				{{ translateKey(String(key)) }}: {{ translateValue(item, String(key)) }}
			</Tag>
		</span>
	</div>
</template>

<style lang="scss">
.table-list-tags {
	padding: 10px 15px;

	.table-list-tags-item {
		display: inline-flex;
		margin-bottom: 5px;
	}
}
</style>
