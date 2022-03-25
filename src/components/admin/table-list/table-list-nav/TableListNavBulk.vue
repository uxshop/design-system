<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { zerofill } from '../../../../filters'
import dialog from '../../../ui/dialog/index'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'
import { each } from 'lodash-es'
import IconButton from '../../../ui/icon-button/IconButton.vue'
import type { TBulkActions, ITableListConfig } from '../types/ITableListConfig'

const emit = defineEmits<{
	(event: 'refresh'): void
	(event: 'selected'): void
	(event: 'checkAll', val: boolean): void
	(event: 'remove'): void
	(event: 'active'): void
	(event: 'inactive'): void
}>()

interface Props {
	rows: unknown[]
	selected: number[]
	config: ITableListConfig
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

const onCheckAll = () => emit('checkAll', !checkbox.value)
const onRemoveDialog = () => {
	const count = zerofill(props.selected.length, 2)

	dialog.open({
		title: 'Excluir registros',
		destructIcon: 'delete',
		destructLabel: `Deletar registros`,
		message: `Você confirma a exclusão dos registros selecionados? <br><small><b>${count}</b> selecionados.</small>`,
		callback: remove
	})
}

const remove = () => emit('remove')
const active = () => emit('active')
const inactive = () => emit('inactive')

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
	<div class="table-list-nav-bulk" :class="{ '-active': selected.length }">
		<div
			@click="onCheckAll"
			class="table-list-nav-item -checkbox"
			v-tooltip:top="`Marcar todos`"
			v-show="!config.hideCheckbox">
			<FormCheckbox :indeterminate="indeterminate" :value="allSelected" v-model="checkbox" />
		</div>

		<span v-tooltip:top="`Deletar selecionados`" class="table-list-nav-item">
			<IconButton
				v-show="selected.length && config.actions?.includes('remove')"
				icon="delete"
				@click="onRemoveDialog"
				size="sm" />
		</span>
		<ui-dropdown variant="white" v-show="selected.length && bulkActions && bulkActions.length > 0" class="ml-2">
			<template #button-content>
				<ui-button size="sm" variant="dark-outline" trailingIcon="unfold_more">
					<span>
						ações para <b>{{ zerofill(selected.length) }}</b> selecionados
					</span>
				</ui-button>
			</template>

			<ui-dropdown-item-button
				v-for="action in bulkActions"
				@click.stop="action.action(selected)"
				:key="action.label"
				:variant="action.variant">
				{{ action.label }}
			</ui-dropdown-item-button>
		</ui-dropdown>
	</div>
</template>

<style lang="scss">
.table-list-nav-bulk {
	display: flex;
	align-items: center;
	padding-left: 12px;
	height: 100%;

	&.-active {
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
