<script setup lang="ts">
import { each, find, isFunction } from 'lodash-es'
import type { ITableListState } from '../types/ITableListState'
import Tag from '../../../ui/tag/Tag.vue'
import { computed, ref, watch } from 'vue'
import { omit } from 'lodash-es'
import TagList from '../../../ui/tag/TagList.vue'
import { DateTime } from 'luxon'

const props = defineProps<{
	state: ITableListState
}>()

const removeFilter = props.state.removeFilter

const translatedValues = ref<Record<string, string>>({})

const translateKey = (item: string) => {
	let val = item
	each(props.state.config.filters, (filter, key) => {
		if (item == key) {
			val = filter.name
		}
	})
	return val
}

const dateFormat = (date: any) => {
	let dates = date.split('--')
	const startDate = DateTime.fromSQL(dates[0]).toFormat('dd/MM/yyyy')

	if (dates.length > 1) {
		const endDate = DateTime.fromSQL(dates[1]).toFormat('dd/MM/yyyy')
		dates = `${startDate} ~ ${endDate}`
	} else {
		dates = startDate
	}

	return dates
}

const translateValue = async (item: any, key: string) => {
	const val: string[] = []
	let values: number[] = []

	if (!props.state.config.filters || !props.state.config.filters[key]) {
		return item
	}

	if (key == 'updated_at' || key == 'created_at') {
		return dateFormat(item)
	}

	if (key == 'q') {
		return item
	}

	if (['text', 'number'].indexOf(props.state.config.filters[key].type) >= 0) {
		return item
	}

	if (isNaN(item)) {
		values = item.split(',')
	} else {
		values = [item]
	}

	const promises = Object.keys(props.state.config.filters).map(async (k: string) => {
		if (k == key) {
			if (isFunction(props.state.config.filters[k]?.filters)) {
				props.state.config.filters[k].filters = await props.state.config.filters[k].filters()
			}

			each(values, (v) => {
				if (!isNaN(v)) {
					v = Number(v)
				}

				const obj = find(props.state.config.filters[k]?.filters, { value: v })
				if (obj) {
					val.push(obj.name)
				}
			})
		}
	})

	await Promise.all(promises)

	return val.join(', ')
}

const showTags = computed(() => {
	const filters = omit(props.state.omitFilters, ['q'])

	return Object.keys(filters).length > 0
})

const updateTranslatedValues = async () => {
	const filters = omit(props.state.omitFilters, ['q'])
	const newTranslatedValues: Record<string, string> = {}

	const promises = Object.keys(filters).map(async (key) => {
		if (key !== 'q') {
			const item = filters[key]
			const translated = await translateValue(item, String(key))
			newTranslatedValues[`${key}:${item}`] = translated
		}
	})

	await Promise.all(promises)
	translatedValues.value = newTranslatedValues
}

watch(() => props.state.omitFilters, updateTranslatedValues, { immediate: true, deep: true })
</script>

<template>
	<TagList class="table-list-tags" v-if="showTags">
		<Tag
			variant="primary"
			@remove="removeFilter(String(key))"
			v-for="(item, key) in state.omitFilters"
			v-show="String(key) != 'q'"
			:key="item">
			{{ translateKey(String(key)) }}: {{ translatedValues[`${key}:${item}`] || item }}
		</Tag>
	</TagList>
</template>

<style lang="scss">
.table-list-tags {
	padding: var(--s-spacing-x-small);
}
</style>
