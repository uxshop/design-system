<script setup lang="ts">
import { isFunction } from 'lodash-es'
import { computed, inject } from 'vue'
import Button from '../../ui/button/Button.vue'
import Container from '../../ui/grid/container/Container.vue'

const register = inject<any>('register') || {}
const emit = defineEmits(['discard', 'save'])
const props = defineProps<{
	loading?: boolean
	editing?: boolean
}>()

const show = computed(() => {
	const isEditing = register.editing || props.editing || false

	if (isEditing) {
		document.body.classList.add('is-editing')
	} else {
		document.body.classList.remove('is-editing')
	}

	return isEditing
})

const handleDiscardChanges = () => {
	emit('discard')
	if (isFunction(register.discard)) {
		register.discard()
	}
}

const onSave = () => emit('save')
</script>

<template>
	<div class="ui-savebar" :class="{ '-show': show }">
		<Container class="ui-savebar-container">
			<div class="ui-savebar-text">Alterações feitas</div>
			<div class="ui-savebar-actions">
				<Button @click="handleDiscardChanges" class="ui-savebar-restore" :disabled="loading">
					<div>Descartar alterações</div>
				</Button>
				<Button
					variant="success"
					type="submit"
					leadingIcon="check"
					label="Salvar"
					:loading="loading"
					:disabled="loading"
					@click="onSave" />
			</div>
		</Container>
	</div>
</template>

<style lang="scss">
@import './Savebar.scss';
</style>
