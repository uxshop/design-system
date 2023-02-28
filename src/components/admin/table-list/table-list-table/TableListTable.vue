<script setup lang="ts">
import type { ITableListState } from '../types/ITableListState'
import { useSlots } from 'vue'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../../button-action/ButtonAction.vue'
import Badge from '../../../ui/badge/Badge.vue'
import TextStyle from '../../../ui/text-style/TextStyle.vue'
import Button from '../../../ui/button/Button.vue'
import TableListItem from '../TableListItem.vue'
import TableListRow from '../TableListRow.vue'

const props = defineProps<{
	state: ITableListState
	rows: Record<string, any>[]
	selected: number[]
	to?: any
}>()

const emit = defineEmits<{
	(event: 'update:selected', seleted: number[]): void
}>()

const slots = useSlots()
const haveSlot = (name: string) => {
	return !!slots[name]
}

const onClickRow = (event: any, item: any) => {
	if (event.target.getAttribute('class') == 'custom-control-label' || event.target.href) {
		return
	}
	props.state.clickRow(item)
}

// const onActiveOne = props.state.activeOne
const onDeleteOne = props.state.deleteOne
const onActiveOne = (item: any) => {
	item.active = !item.active
	props.state.activeOne(item, item.active)
}

const onCheckOne = (e: MouseEvent, item: any) => {
	if (props.selected.includes(item.id)) {
		item.__checked = false
		const selectedNew = props.selected.filter((id) => {
			return id != item.id
		})
		emit('update:selected', selectedNew)
	} else {
		item.__checked = true
		props.selected.push(item.id)
	}
}
</script>

<template>
	<div class="table table-flex table-hover" v-if="rows.length" v-memo="[rows]">
		<div class="table-list-header" v-if="$slots.head">
			<TableListItem v-if="!state.config.hideCheckbox" auto class="-checkbox" />
			<slot name="head" />
			<TableListItem v-if="state.config.actions.length" />
		</div>
		<component
			v-for="(item, key) in rows"
			@click="onClickRow($event, item)"
			class="table-list-row"
			:is="to ? 'router-link' : 'div'"
			:to="{ name: to, params: { id: item.id } }"
			:key="item.id"
			:class="{
				'-selected': selected.includes(item.id),
				'-inactive': item.active == false
			}">
			<TableListItem v-if="!state.config.hideCheckbox" @click.stop.prevent="onCheckOne($event, item)" auto>
				<FormCheckbox :modelValue="selected" :value="item.id" noEvents />
			</TableListItem>

			<slot v-bind:item="item" />

			<TableListItem v-if="state.config.actions?.length" auto>
				<Button
					v-if="state.config.actions && state.config.actions.includes('active')"
					@click.stop.prevent="onActiveOne(item)"
					variant="plain"
					size="sm">
					<TextStyle v-if="item.active" variant="success" label="Ativo" />
					<TextStyle v-else variant="danger" label="Inativo" />
				</Button>
			</TableListItem>

			<!-- <td class="td-action" width="1"> -->
			<!-- <ButtonAction
						v-if="state.config.actions.includes('remove')"
						@delete="onDeleteOne(item)"
						:delete-name="item.name"
						type="delete" />
					<ButtonAction
						v-if="state.config.actions.includes('active')"
						v-model:active="item.active"
						@active="onActiveOne(item, true)"
						@inactive="onActiveOne(item, false)"
						type="active" /> -->
			<!-- </td> -->
		</component>
		<!-- </tbody> -->
	</div>
</template>

<style lang="scss">
@import './TableListTable.scss';
</style>
