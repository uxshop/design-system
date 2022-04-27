<script setup lang="ts">
// import BrowserSelectModal from './BrowserSelectModal.vue'
import { cloneDeep, each, find, first, isArray } from 'lodash-es'
import { ref, watch } from 'vue'
import ButtonAction from '../button-action/ButtonAction.vue'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Button from '../../ui/button/Button.vue'
import Link from '../../ui/link/Link.vue'

export interface Props {
	modelValue: any
	id?: string
	service?: any
	selectOne?: boolean
	title?: string
	hideList?: boolean
	baseParams?: any
	noFetch?: boolean
	hideBtn?: boolean
	size?: string | number
	thumbSize?: string | number
	selectType?: 'btn' | 'input'
	list?: any
	limit?: number | string
	identifier?: string
	placeholder?: string
	type?: 'product' | 'brand' | 'category' | 'landing' | 'customer' | 'customer_group' | 'variant' | 'feature'
}

const emit = defineEmits(['remove-item', 'change', 'update:modelValue', 'update'])
const props = withDefaults(defineProps<Props>(), {
	thumbSize: 50,
	type: 'product',
	placeholder: 'Selecione',
	identifier: 'id',
	limit: 0
})

const searchBy = ref<string | null>(null)
const term = ref<string | null>(null)
const ids = ref<number[]>([])
const rows = ref([])
const memoryList = ref([])
const paginateLimit = ref(5)

const onClickSearch = () => {
	// modal open
}

const onChangeTerm = () => {
	if (term.value && term.value.length > 2) {
		onClickSearch()
		searchBy.value = String(term.value)
		term.value = null
	}
}

const nextPage = () => {
	paginateLimit.value += 5
}

const onRemoveItem = (item) => {
	emit('remove-item', item)

	if (find(rows.value, { [props.identifier]: item[props.identifier] })) {
		rows.value = rows.value.filter((obj) => {
			return obj[props.identifier] != item[props.identifier]
		})
	} else {
		rows.value.push(item[props.identifier])
	}

	ids.value = rows.value.map((item) => {
		return item[props.identifier]
	})

	updateInput(ids.value)
}

const updateInput = (ids) => {
	const input = formatInput(ids)
	emit('change', input)
	emit('update:modelValue', input)
}

const formatInput = (ids) => {
	if (props.selectOne) {
		return first(ids) || null
	}
	return ids
}

const fetch = async () => {
	let newRows = []

	if (ids.value.length) {
		each(ids.value, (id) => {
			const item = find(memoryList.value, { [props.identifier]: id })

			if (item) {
				newRows.push(item)
			}
		})

		if (newRows.length != ids.value.length) {
			let params = cloneDeep(props.baseParams || {})

			if (props.selectOne) {
				params.id = ids.value[0]
				newRows = await props.service.first(params)
				newRows = [newRows]
			} else {
				params.ids = ids.value.join(',')
				newRows = await props.service.get(params)
				newRows = newRows.data
			}
		}

		if (props.selectOne) {
			newRows = [newRows[0]]
		}
	}

	pushToMemoryList(newRows)
	rows.value = newRows
}

const populateList = (newVal) => {
	if (newVal) {
		if (!isArray(newVal)) {
			newVal = [newVal]
		}

		pushToMemoryList(newVal)
	}
}

const pushToMemoryList = (items) => {
	items.map((item) => {
		if (item.id && !find(memoryList.value, { [props.identifier]: item[props.identifier] })) {
			memoryList.value.push(cloneDeep(item))
		}
	})
}

watch(
	() => props.list,
	(newVal) => {
		populateList(newVal)
	},
	{ deep: true, immediate: true }
)

watch(
	() => rows.value,
	(newVal) => {
		emit('update', newVal)
	}
)

watch(
	() => props.modelValue,
	(newVal) => {
		if (newVal == ids.value) {
			return
		}

		if (newVal) {
			ids.value = isArray(newVal) ? newVal : [newVal]
		} else {
			ids.value = []
		}

		if (!memoryList.value.length) {
			populateList(props.list)
		}

		if (props.noFetch === false) {
			fetch()
		}
	},
	{ deep: true, immediate: true }
)
</script>

<template>
	<!-- <BrowserSelectModal
		@close="onClose"
		:selecteds="ids"
		:service="service"
		:base-params="baseParams"
		:search-by="searchBy"
		:select-one="selectOne"
		:type="type"
		:identifier="identifier"
		:limit="limit" /> -->
	<div class="ui-browser-select">
		{{ ids }}
		<div class="ui-browser-select-button">
			<slot name="button" v-if="selectType == 'btn' && !hideBtn">
				<div class="area-select" @click="onClickSearch" :class="{ disabled: limit > 0 && rows.length == limit }">
					<span>{{ placeholder }}</span>
				</div>
			</slot>
		</div>
		<div>
			<div class="ui-browser-select-input">
				<Row>
					<Col>
						<FormTextfield v-model="term" placeholder="Procurar..." @keyup="onChangeTerm" />
					</Col>
					<Col auto>
						<Button variant="dark" @click="onClickSearch">Pesquisar</Button>
					</Col>
				</Row>
			</div>

			<div class="ui-browser-list mt-5" _v-if="!hideList && rows.length">
				<div class="ui-browser-list-row" v-for="item in rows.slice(0, paginateLimit)" :key="item[identifier]">
					<div class="ui-browser-list-cell">
						{{ item.name }}
					</div>
					<div class="ui-browser-list-cell -auto">
						<ButtonAction size="sm" type="remove" @click="onRemoveItem(item)" />
					</div>
				</div>
				<Link class="ui-browser-list-more" @click="nextPage" v-if="rows.length > paginateLimit"> Exibir mais </Link>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './BrowserSelect.scss';
</style>
