<script setup lang="ts">
import type { ITableListState } from '../types/ITableListState'
import { useSlots } from 'vue'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../../button-action/ButtonAction.vue'
import Badge from '../../../ui/badge/Badge.vue'
import TextStyle from '../../../ui/text-style/TextStyle.vue'
import Button from '../../../ui/button/Button.vue'

const props = defineProps<{
	state: ITableListState
	rows: Record<string, any>[]
	selected: number[]
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
	e.stopPropagation()

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
	<table class="table table-hover" v-if="rows.length">
		<thead v-if="haveSlot('head')">
			<tr>
				<th v-if="!state.config.hideCheckbox" class="td-fixed"></th>
				<slot name="head" />
				<th v-if="state.config.actions.length"></th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(item, key) in rows"
				@click="onClickRow($event, item)"
				:key="item.id"
				:class="{
					'-selected': selected.includes(item.id),
					'-inactive': item.active == false
				}">
				<td v-if="!state.config.hideCheckbox" @click.stop="onCheckOne($event, item)" class="td-fixed td-checkbox">
					<FormCheckbox v-model="selected" :value="item.id" noEvents />
				</td>

				<slot v-bind:item="item" />

				<td class="td-action" width="1" v-if="state.config.actions?.length">
					<div v-if="state.config.actions && state.config.actions.includes('active')" @click.stop="onActiveOne(item)">
						<TextStyle v-if="item.active" variant="success" label="Ativo" />
						<TextStyle v-else variant="danger" label="Inativo" />
					</div>
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
				</td>
			</tr>
		</tbody>
	</table>
</template>
