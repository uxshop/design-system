<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { zerofill } from '../../../../filters'
import dialog from '../../../ui/dialog/index'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'
import { each } from 'lodash-es'
import IconButton from '../../../ui/icon-button/IconButton.vue'
import type { TBulkActions, ITableListConfig } from '../types/ITableListConfig'
import Dropdown from '../../../ui/dropdown/Dropdown.vue'
import Button from '../../../ui/button/Button.vue'
import DropdownItemButton from '../../../ui/dropdown/DropdownItemButton.vue'

interface Props {
	rows: unknown[]
	selected: number[]
	config: ITableListConfig
	state: any
}

const props = withDefaults(defineProps<Props>(), {
	selected: () => {
		return []
	},
	rows: () => {
		return []
	}
})

const bulkActions = ref<TBulkActions>([])
const indeterminate = ref<boolean>(false)
const allSelected = ref<boolean>(false)
const checkbox = ref<boolean>(false)

const onCheckAll = () => props.state.checkAll(!checkbox.value)
const onRemoveDialog = () => {
	const count = zerofill(props.selected.length, 2)

	dialog.open({
		title: 'Excluir registros',
		destructIcon: 'delete',
		destructLabel: `Deletar registros`,
		message: `Você confirma a exclusão dos registros selecionados? <br><small><b>${count}</b> selecionados.</small>`,
		onCallback: remove
	})
}

const remove = () => props.state.remove
const active = () => props.state.toggleActiveSelecteds(true)
const inactive = () => props.state.toggleActiveSelecteds(true)

watchEffect(() => {
	if (props.rows.length && props.selected.length == props.rows.length) {
		allSelected.value = true
		indeterminate.value = false
	} else if (props.selected.length) {
		allSelected.value = false
		indeterminate.value = true
	} else {
		allSelected.value = false
		indeterminate.value = false
	}

	checkbox.value = allSelected.value
})

onMounted(() => {
	each(props.config.actions, (item) => {
		if (item == 'active') {
			bulkActions.value.push({
				label: 'Ativar registros',
				action: active
			})
			bulkActions.value.push({
				label: 'Inativar registros',
				action: inactive
			})
		}

		if (item == 'remove') {
			bulkActions.value.push({
				label: 'Remover registros',
				variant: 'danger',
				action: onRemoveDialog
			})
		}
	})

	if (props.config.bulk) {
		bulkActions.value.push(...props.config.bulk)
	}
})
</script>

<template>
	<div v-show="!config.hideCheckbox" class="table-list-nav-bulk" :class="{ '-active': selected.length }">
		<div @click="onCheckAll" class="-checkbox">
			<FormCheckbox :indeterminate="indeterminate" :value="allSelected" v-model="checkbox" />
		</div>

		<span v-show="selected.length && config.actions?.includes('remove')" class="table-list-nav-item">
			<IconButton icon="delete" @click="onRemoveDialog" size="sm" />
		</span>

		<Dropdown variant="white" v-show="selected.length && bulkActions && bulkActions.length > 0" class="ml-2">
			<template #button-content>
				<Button size="sm" variant="dark" trailingIcon="unfold_more">
					ações para <b>{{ zerofill(selected.length) }}</b> selecionados
				</Button>
			</template>

			<DropdownItemButton
				v-for="action in bulkActions"
				@click.stop="action.action(selected)"
				:key="action.label"
				:variant="action.variant"
				:label="action.label" />
		</Dropdown>
	</div>
</template>

<style lang="scss">
.table-list-nav-bulk {
	display: flex;
	align-items: center;
	height: 100%;
	gap: 10px;
	padding-right: 20px;

	&.-active {
		padding-left: 15px;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 88;
		background: #fff;
	}

	.table-list-nav-select {
		display: flex;
		align-items: center;
	}
}
</style>