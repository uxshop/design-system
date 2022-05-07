<script setup lang="ts">
import { useSlots } from 'vue'
import FormCheckbox from '../../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../../button-action/ButtonAction.vue'

const props = defineProps<{
	rows: Record<string, any>[]
	actions: string[]
	selected: number[]
	hideCheckbox: boolean
}>()

const emit = defineEmits<{
	(event: 'toggleActive', item: any, active: boolean): void
	(event: 'clickRow', item: any): void
	(event: 'delete', item: any): void
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
	emit('clickRow', item)
}

const onActiveOne = (item: any, active: boolean) => {
	emit('toggleActive', item, active)
}

const onDeleteOne = async (item: any) => {
	emit('delete', item)
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
				<th v-if="!hideCheckbox" class="td-fixed"></th>
				<slot name="head" />
				<th v-if="actions.length"></th>
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
				<td v-if="!hideCheckbox" @click="onCheckOne($event, item)" class="td-fixed td-checkbox">
					<FormCheckbox v-model="selected" :value="item.id" />
				</td>

				<slot v-bind:item="item" />

				<td class="td-action" width="1" v-if="actions.length">
					<ButtonAction
						v-if="actions.includes('remove')"
						@delete="onDeleteOne(item)"
						:delete-name="item.name"
						type="delete" />
					<ButtonAction
						v-if="actions.includes('active')"
						v-model:active="item.active"
						@active="onActiveOne(item, true)"
						@inactive="onActiveOne(item, false)"
						type="active" />
				</td>
			</tr>
		</tbody>
	</table>
</template>
