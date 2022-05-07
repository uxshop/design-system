<script setup lang="ts">
import { each, find, isFunction } from 'lodash'
import Tag from '../../../ui/tag/Tag.vue'

const props = defineProps<{
	omitFilters: any
	filters: any
}>()

const emit = defineEmits(['remove'])

const removeFilter = (key: string) => {
	emit('remove', key)
}

const translateKey = (item: string) => {
	let val = item
	each(props.filters, (filter, key) => {
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

	if (props.filters[key].type == 'browser') {
		let count = props.omitFilters[key].split(',').length
		let text = count == 1 ? 'filtro' : 'filtros'
		return `${count} ${text}`
	}

	if (['text', 'number'].indexOf(props.filters[key].type) >= 0) {
		return item
	}

	if (isNaN(item)) {
		values = item.split(',')
	} else {
		values = [item]
	}

	each(props.filters, (filter, k) => {
		if (k == key) {
			if (isFunction(filter.filters)) {
				// Executar e colocar como valor
				filter.filters = filter.filters()
			}

			each(values, (v) => {
				if (!isNaN(v)) {
					v = Number(v)
				}

				const obj = find(filter.filters, { value: v })
				if (obj) {
					val.push(obj.name)
				}
			})
		}
	})

	return val.join(', ')
}
</script>

<template>
	<div class="table-list-tags" v-if="Object.keys(omitFilters).length > 0">
		<span v-for="(item, key) in omitFilters" v-show="String(key) != 'q'" :key="item" class="table-list-tags-item">
			<Tag variant="dark" @remove="removeFilter(String(key))" class="mr-1">
				{{ translateKey(String(key)) }}: {{ translateValue(item, String(key)) }}
			</Tag>
		</span>
	</div>
</template>

<style lang="scss">
.table-list-tags {
	padding: 10px 20px;

	.table-list-tags-item {
		display: inline-flex;
		margin-bottom: 5px;

		// .badge {
		// 	color: #0b7bda;
		// 	background: #02b9ff38;
		// 	border-radius: 3rem;
		// }

		// .close {
		// 	opacity: 1;
		// }
	}
}
</style>
