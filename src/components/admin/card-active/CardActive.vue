<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Card from '../../ui/card/Card.vue'
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../button-action/ButtonAction.vue'

const emit = defineEmits(['delete', 'toggleActive', 'update:modelValue'])
const props = withDefaults(
	defineProps<{
		modelValue: any
		hideDelete?: boolean
		preventActive?(): void
		delete?(id: number): Promise<void>
	}>(),
	{
		modelValue: () => ({ active: true })
	}
)

const onDelete = async () => {
	if (props.delete && props.modelValue.id) {
		await props.delete(props.modelValue.id)
	}

	emit('delete', { id: props.modelValue.id })
}

const onClickActive = (e) => {
	if (props.preventActive) {
		props.preventActive()
		e.preventDefault()
	}
}

const changeActive = () => {
	emit('toggleActive', props.modelValue.active)
}
</script>

<template>
	<Card class="ui-card-active">
		<Row alignV="center">
			<Col>
				<FormCheckbox v-model="modelValue.active" switch @change="changeActive" @click.stop="onClickActive">
					<span v-show="modelValue.active">Ativo</span>
					<span v-show="!modelValue.active">Inativo</span>
				</FormCheckbox>
			</Col>
			<Col auto>
				<ButtonAction
					v-if="!hideDelete && modelValue.id"
					type="delete"
					:deleteName="modelValue.name"
					@delete="onDelete" />
			</Col>
		</Row>
	</Card>
</template>
