<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Card from '../../ui/card/Card.vue'
import FormCheckbox from '../../ui/form-checkbox/FormCheckbox.vue'
import ButtonAction from '../button-action/ButtonAction.vue'

interface Props {
	modelValue: any
	resource: object
	canDelete: boolean
	delete(val: string): Promise<void>
}

const emit = defineEmits(['delete', 'active'])
const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({}),
	canDelete: true
})

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
	<Card class="ui-card-active">
		<Row alignV="center">
			<Col>
				<FormCheckbox :value="modelValue.active" switch @update="changeActive">
					<span v-show="modelValue.active">Ativo</span>
					<span v-show="!modelValue.active">Inativo</span>
				</FormCheckbox>
			</Col>
			<Col auto>
				<ButtonAction
					v-if="canDelete"
					v-show="modelValue.id"
					type="delete"
					:deleteName="modelValue.name"
					@delete="onDelete"
				/>
			</Col>
		</Row>
	</Card>
</template>
