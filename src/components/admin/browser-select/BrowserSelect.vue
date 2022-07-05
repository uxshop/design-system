<script setup lang="ts">
import { cloneDeep, each, find, first, isArray } from 'lodash-es'
import { ref, watch } from 'vue'
import ButtonAction from '../button-action/ButtonAction.vue'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Button from '../../ui/button/Button.vue'
import Link from '../../ui/link/Link.vue'
import BrowserSelectModal from './BrowserSelectModal.vue'

export interface Props {
	modelValue: any
	templateCustom?: any
	id?: string
	service: {
		get(params: any): any
	}
	selectOne?: boolean
	title?: string
	hideList?: boolean
	noFetch?: boolean
	hideBtn?: boolean
	size?: string | number
	thumbSize?: string | number
	selectType?: 'btn' | 'input'
	list?: any
	limit?: number | string
	identifier?: string
	placeholder?: string
}

const emit = defineEmits(['remove', 'change', 'update:modelValue', 'update'])
const props = withDefaults(defineProps<Props>(), {
	thumbSize: 50,
	type: 'product',
	placeholder: 'Selecione',
	identifier: 'id',
	limit: 0
})

const searchBy = ref<string | null>(null)
const term = ref<string | null>(null)
const selectedIds = ref<number[]>([])
const rows = ref<any[]>([])
const memoryList = ref([])
const paginateLimit = ref(5)
const browserSelectModalRef = ref()

const onClickSearch = () => {
	browserSelectModalRef.value.open({
		selectedIds: selectedIds.value,
		searchBy: searchBy.value
	})
}

const onChangeTerm = () => {
	if (term.value && term.value.length > 1) {
		searchBy.value = String(term.value)
		term.value = null
		onClickSearch()
	}
}

const nextPage = () => {
	paginateLimit.value += 5
}

const onRemoveItem = (item: any) => {
	emit('remove', item)

	if (find(rows.value, { [props.identifier]: item[props.identifier] })) {
		rows.value = rows.value.filter((obj) => {
			return obj[props.identifier] != item[props.identifier]
		})
	} else {
		rows.value.push(item[props.identifier])
	}

	selectedIds.value = rows.value.map((item) => {
		return item[props.identifier]
	})

	updateInput(selectedIds.value)
}

const updateInput = (ids: number[]) => {
	const input = formatInput(ids)
	emit('update:modelValue', input)
	emit('update', input)
}

const formatInput = (ids: number[]) => {
	if (props.selectOne) {
		return first(ids) || null
	}
	return ids
}

const getFromMemoryList = (newRows: unknown[]) => {
	each(selectedIds.value, (id) => {
		const item = find(memoryList.value, { [props.identifier]: id })

		if (item) {
			newRows.push(item)
		}
	})
}

const fetch = async () => {
	let newRows: unknown[] = []

	if (selectedIds.value.length) {
		getFromMemoryList(newRows)

		if (newRows.length != selectedIds.value.length) {
			if (props.selectOne) {
				// params.id = selectedIds.value[0]
				// newRows = await props.service.first(params)
				// newRows = [newRows]
			} else {
				const res = await props.service.get({
					ids: selectedIds.value.join(',')
				})
				newRows = res.data
			}
		}

		if (props.selectOne) {
			// newRows = [newRows[0]]
		}
	}

	// pushToMemoryList(newRows)
	rows.value = newRows
}

const populateList = (newVal: any) => {
	if (newVal) {
		if (!isArray(newVal)) {
			newVal = [newVal]
		}

		pushToMemoryList(newVal)
	}
}

const pushToMemoryList = (items: any[]) => {
	items.map((item: any) => {
		if (item.id && !find(memoryList.value, { [props.identifier]: item[props.identifier] })) {
			//@ts-expect-error: cloneDeep
			memoryList.value.push(cloneDeep(item))
		}
	})
}

const updateByModal = ({ memoryList, ids }: any) => {
	searchBy.value = null
	pushToMemoryList(memoryList)
	if (ids) {
		updateInput(ids)
	}
}

watch(
	() => props.list,
	(newVal) => {
		populateList(newVal)
		rows.value = props.list || []
	},
	{ deep: true, immediate: true }
)

watch(
	() => rows.value,
	(newVal) => {
		emit('change', newVal)
	}
)

watch(
	() => props.modelValue,
	(newVal) => {
		if (newVal == selectedIds.value) {
			return
		}

		if (newVal) {
			selectedIds.value = isArray(newVal) ? newVal : [newVal]
		} else {
			selectedIds.value = []
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
defineExpose({ onClickSearch })
</script>

<template>
	<div class="ui-browser-select">
		<div class="ui-browser-select-button" v-if="selectType == 'btn' && !hideBtn">
			<slot name="button">
				<div class="area-select" @click="onClickSearch" :class="{ disabled: limit > 0 && rows.length == limit }">
					<span>{{ placeholder }}</span>
				</div>
			</slot>
		</div>
		<div v-else>
			<div class="ui-browser-select-input">
				<Row>
					<Col>
						<FormTextfield v-model="term" placeholder="Procurar..." @keyup="onChangeTerm" autocomplete="off" />
					</Col>
					<Col auto>
						<Button variant="dark" @click="onClickSearch">Pesquisar</Button>
					</Col>
				</Row>
			</div>

			<div class="ui-browser-list" v-if="!hideList && rows.length">
				<div class="ui-browser-list-row" v-for="item in rows.slice(0, paginateLimit)" :key="item[identifier]">
					<component :is="templateCustom" :item="item" />
					<div class="ui-browser-list-cell -auto">
						<ButtonAction size="sm" type="remove" @click="onRemoveItem(item)" />
					</div>
				</div>

				<div class="ui-browser-list-more">
					<Link @click="nextPage" v-if="rows.length > paginateLimit" label="Exibir mais" />
				</div>
			</div>
		</div>
	</div>

	<BrowserSelectModal
		ref="browserSelectModalRef"
		@update="updateByModal"
		:templateCustom="templateCustom"
		:service="service"
		:searchBy="searchBy"
		:selectOne="selectOne"
		:identifier="identifier"
		:limit="limit" />
</template>

<style lang="scss">
@import './BrowserSelect.scss';
</style>
