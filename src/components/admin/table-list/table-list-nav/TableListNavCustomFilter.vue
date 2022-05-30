<script setup lang="ts">
import Dropdown from '../../../ui/dropdown/Dropdown.vue'
import Button from '../../../ui/button/Button.vue'
import FormTextfield from '../../../ui/form-textfield/FormTextfield.vue'
import { computed, onMounted, ref } from 'vue'
import Stack from '../../../ui/stack/Stack.vue'
import DropdownSection from '../../../ui/dropdown/DropdownSection.vue'
import { cloneDeep, keys, pick, find, omit, isNumber, concat, isObject, each } from 'lodash-es'
import toast from '../../../ui/toast'
import type { ITableListState } from '../types/ITableListState'
import { slugify } from '../../../../filters'

interface FilterInterface {
	id: number | string
	name: string
	view: string | number
	filter: Record<string, any>
}

const props = defineProps<{
	state: ITableListState
	service: {
		get(params: any): Promise<void>
		create(data: any): Promise<void>
		update(id: number, data: any): Promise<void>
		delete(id: number): Promise<void>
	}
}>()

const max = 5
const tabs: any = []
const tab = ref()
const dropdownRef = ref()
const reg = ref<{
	id?: number | null
	name?: string | null
	filter?: any
	resource?: string
}>({
	name: null
})

const addTab = (tab: any) => {
	tab.view = tab.id || slugify(tab.name)
	tabs.push(tab)
}

onMounted(async () => {
	const res = await props.service.get({ resource: 'products' })

	each(props.state.config.customFilterPresets, (item) => {
		if (isObject(item)) {
			addTab(item)
		}

		if (item == 'active') {
			addTab({ name: 'Ativo', filter: { active: 1 } })
			addTab({ name: 'Inativo', filter: { active: 0 } })
		}
	})

	each(res.data, (item) => {
		addTab(item)
	})

	props.state.tabs = tabs
})

const disableDropdown = computed(() => {
	if (isNumber(props.state.queryParams.selectedView)) {
		return false
	}

	if (keys(props.state.omitFilters).length && props.state.queryParams.selectedView == 'all') {
		return false
	}

	return true
})

const onRemoveTab = async () => {
	if (props.state.currentTab) {
		// await props.service.delete(props.state.currentTab)

		dropdownRef.value.hide()

		props.state.tabs = props.state.tabs.filter((item) => {
			return item.id != props.state.currentTab
		})

		props.state.resetQueryParams({
			selectedView: 'all'
		})

		toast.open('Filtro deletado com sucesso')
	}
}

const onSave = async () => {
	let res: any
	if (reg.value.id) {
		res = await props.service.update(reg.value.id, pick(reg.value, ['name', 'filter']))
		tab.value.name = reg.value.name
	} else {
		res = await props.service.create({
			name: reg.value.name,
			filter: omit(props.state.queryParams, props.state.omitFiltersValues),
			resource: 'products'
		})
		props.state.tabs.push(res)
		props.state.setQueryParams({
			selectedView: res.id
		})
	}

	dropdownRef.value.hide()
}

const onShowDropdown = () => {
	tab.value = find(props.state.tabs, { view: Number(props.state.currentTab) })

	if (tab.value) {
		reg.value = cloneDeep(tab.value)
	} else {
		reg.value = {
			name: null
		}
	}
}
</script>

<template>
	<span class="table-list-nav-item -custom-filter">
		<Dropdown right ref="dropdownRef" @show="onShowDropdown" :disabled="disableDropdown">
			<template #button-content>
				<Button
					v-if="Number(state.currentTab) >= 1"
					label="Editar filtro"
					leadingIcon="star"
					size="sm"
					variant="dark"
					:disabled="disableDropdown" />
				<Button v-else label="Salvar filtro" leadingIcon="star" size="sm" :disabled="disableDropdown" />
			</template>
			<DropdownSection>
				<form @submit.prevent="onSave" id="form-custom-filter" autocomplete="off">
					<FormTextfield
						size="sm"
						v-model="reg.name"
						placeholder="Nome do filtro"
						style="min-width: 210px"
						data-close="none"
						label="Salvar como"
						required
						tabindex="1" />
					<div>Os filtros são salvos como uma nova aba no topo desta lista.</div>
				</form>
			</DropdownSection>
			<DropdownSection>
				<Stack distribution="between">
					<div>
						<Button
							v-if="reg.id"
							tabindex="-1"
							size="sm"
							label="Remover"
							variant="danger"
							outline
							@click="onRemoveTab" />
					</div>
					<Button size="sm" label="Salvar" tabindex="2" type="submit" form="form-custom-filter" />
				</Stack>
			</DropdownSection>
		</Dropdown>
		<!-- <base-dialog ref="dialog" type="confirm" destruct-label="Entendi" destruct-variant="primary" title="Atenção">
			Você só pode ter <b>{{ max }}</b> filtros por sessão.
		</base-dialog> -->
	</span>
</template>
