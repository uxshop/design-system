<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Card from '../../ui/card/Card.vue'
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../button-action/ButtonAction.vue'

interface ModelInterface {
	id?: number
	active?: boolean
	name?: string
}

interface Props {
	modelValue: ModelInterface
	hideDelete?: boolean
	delete?(id: number): Promise<void>
}

const emit = defineEmits(['delete', 'active', 'update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({})
})

const onDelete = async () => {
	if (props.delete && props.modelValue.id) {
		await props.delete(props.modelValue.id)
	}
	emit('delete', { id: props.modelValue.id })
}

const changeActive = () => {
	emit('update:modelValue', { ...props.modelValue, ...{ active: !props.modelValue.active } })
	emit('active', props.modelValue.active)
}
</script>

<template>
	<Card class="ui-card-active">
		<Row alignV="center">
			<Col>
				<FormCheckbox :value="modelValue.active" switch @change="changeActive">
					<span v-show="modelValue.active">Ativo</span>
					<span v-show="!modelValue.active">Inativo</span>
				</FormCheckbox>
			</Col>
			<Col auto>
				<ButtonAction
					v-if="!hideDelete"
					v-show="modelValue.id"
					type="delete"
					:delete-name="modelValue.name"
					@delete="onDelete" />
			</Col>
		</Row>
	</Card>
</template>
