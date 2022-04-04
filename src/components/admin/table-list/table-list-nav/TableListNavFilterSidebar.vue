<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { each, clone, isFunction, keys } from 'lodash-es'
import Icon from '../../../ui/icon/Icon.vue'
import Row from '../../../ui/grid/row/Row.vue'
import Col from '../../../ui/grid/col/Col.vue'
import Button from '../../../ui/button/Button.vue'
import Aside from '../../../ui/aside/Aside.vue'
import FormTextfield from '../../../ui/form-textfield/FormTextfield.vue'
import FormRadio from '../../../ui/form-radio/FormRadio.vue'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'

const props = defineProps<{
	filters: any
	currentFilters: Record<string, any>
}>()
const emit = defineEmits(['close'])
const selected = ref<Record<string, any>>({})
const aside = ref(false)
const accordion = ref<Record<string, any>>({})
let selectedDefault: Record<string, any> | null = null

const reset = () => {
	const newSelected: Record<string, any> = {}
	each(props.filters, (filter, key) => {
		if (filter.type == 'checkbox') {
			newSelected[key] = []
		} else {
			newSelected[key] = null
		}
	})
	selected.value = Object.assign({}, newSelected)
	selectedDefault = Object.assign({}, clone(newSelected))
}

const onCollapse = (key: string) => {
	if (!accordion.value[key]) {
		if (isFunction(props.filters[key].filters)) {
			props.filters[key].filters = props.filters[key].filters()
		}
	}
	accordion.value[key] = !accordion.value[key]
}

const onClearAll = reset
const onApply = () => emit('close', selected.value)

const hasSelected = () => {
	return JSON.stringify(selected.value) != JSON.stringify(selectedDefault)
}

const onClearFilter = (filter: { type: string }, key: string | number) => {
	if (filter.type == 'checkbox') {
		selected.value[key] = []
	} else {
		selected.value[key] = null
	}
}

const hasFilterSelected = (filter: { type: string }, key: string | number) => {
	if (filter.type == 'checkbox') {
		return Boolean(selected.value[key].length)
	}
	return selected.value[key] !== null && selected.value[key] !== undefined
}

const toggle = () => {
	aside.value = !aside.value
}

onMounted(() => {
	reset()
	const newCurrentFilters: Record<string, any> = {}
	each(props.currentFilters, (item, key) => {
		if (props.filters[key] !== undefined && ['checkbox', 'browser'].indexOf(props.filters[key].type) >= 0) {
			item = item.split(',')
		}
		newCurrentFilters[key] = item
	})

	selected.value = Object.assign(selected.value, newCurrentFilters)

	if (Object.keys(props.filters).length == 1) {
		const key = keys(props.filters)[0]
		onCollapse(key)
	}
})
</script>

<template>
	<Aside v-model="aside" title="Filtros" scrollable>
		<form @submit.prevent="onApply" id="formFilter">
			<div class="filter-list">
				<div
					v-for="(filter, key) in filters"
					:key="filter.name"
					class="filter-list-item"
					:class="{ '-active': accordion[key], '-checked': hasFilterSelected(filter, key) }">
					<div class="filter-list-title" @click="onCollapse(filter)">
						<span>{{ filter.name }}</span>
						<Icon name="expand_more" />
					</div>
					<div class="filter-list-accordion" v-if="accordion[key]" v-show="accordion[key]">
						<div v-if="filter.type == 'browser'">
							<!-- <base-browser-select
								v-model="selected[key]"
								:name="`check_${key}`"
								:type="filter.model"
								:list="filter.filters"
								placeholder="selecione"
								title="Selecione"
								select-type="input"
							/> -->
						</div>

						<div v-else-if="['text', 'number'].indexOf(filter.type) >= 0">
							<FormTextfield
								v-model="selected[key]"
								class="d-block mb-2"
								:name="`check_${key}`"
								:placeholder="filter.placeholder"
								:type="filter.type" />
						</div>

						<div v-else v-for="item in filter.filters" :key="item.key">
							<div v-if="filter.type == 'radio'">
								<FormRadio
									class="d-block mb-2"
									v-model="selected[key]"
									:name="`radio_${key}`"
									:value="item.value"
									tabindex="1">
									{{ item.name }}
								</FormRadio>
							</div>
							<div v-if="filter.type == 'checkbox'">
								<FormCheckbox
									class="d-block mb-2"
									v-model="selected[key]"
									:name="`check_${key}`"
									:value="item.value"
									tabindex="1">
									{{ item.name }}
								</FormCheckbox>
							</div>
						</div>
						<div class="text-left mt-3">
							<Button
								variant="link"
								flush="left"
								@click="onClearFilter(filter, key)"
								:disabled="!hasFilterSelected(filter, key)"
								size="sm">
								Limpar
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
		<template #footer>
			<Row alignV="center">
				<Col>
					<Button type="submit" form="formFilter" block variant="primary" leadingIcon="check"> Aplicar </Button>
				</Col>
				<Col>
					<Button variant="white" size="sm" @click="onClearAll" :disabled="!hasSelected()"> limpar os filtros </Button>
				</Col>
			</Row>
		</template>
	</Aside>
</template>

<style lang="scss">
@import './TableListNavFilterSidebar.scss';
</style>
