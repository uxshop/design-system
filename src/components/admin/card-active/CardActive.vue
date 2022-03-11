<script setup lang="ts">
import UiRow from '../../ui/grid/row/Row.vue'
import UiCol from '../../ui/grid/col/Col.vue'
import Card from '../../ui/card/Card.vue'
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../button-action/ButtonAction.vue'

interface Props {
	resource: object
	modelValue: any
	canDelete: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({}),
	canDelete: true
})

const emit = defineEmits(['delete', 'active'])

const onDelete = async () => {
	if (props.resource) {
		await props.delete(props.modelValue.id)
	}
	emit('delete', { id: props.modelValue.id })
}

const changeActive = () => {
	emit('active', props.modelValue.active)
}
</script>

<template>
	<card class="ui-card-active">
		<ui-row alignV="center">
			<ui-col>
				<form-checkbox v-model="modelValue.active" switch @update="changeActive">
					<span v-show="modelValue.active">Ativo</span>
					<span v-show="!modelValue.active">Inativo</span>
				</form-checkbox>
			</ui-col>
			<ui-col auto>
				<button-action
					v-if="canDelete"
					v-show="modelValue.id"
					type="delete"
					@delete="onDelete"
					:deleteName="modelValue.name"
				/>
			</ui-col>
		</ui-row>
	</card>
</template>
