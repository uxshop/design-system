<script setup lang="ts">
import { isFunction } from 'lodash-es'
import { computed, inject } from 'vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Button from '../../ui/button/Button.vue'
import Container from '../../ui/grid/container/Container.vue'
interface ProvideRegisterInterface {
	editing: boolean
	discard: () => void
}

const register = inject('register') as ProvideRegisterInterface

const show = computed(() => {
	const isEditing = register.editing

	if (isEditing) {
		document.body.classList.add('is-editing')
	} else {
		document.body.classList.remove('is-editing')
	}

	return isEditing
})

const handleDiscardChanges = () => {
	if (isFunction(register.discard)) {
		register.discard()
	}
}
</script>

<template>
	<div class="ui-savebar" :class="{ '-show': show }">
		<Container class="ui-savebar-container">
			<div class="ui-savebar-text">Alterações feitas</div>
			<div class="ui-savebar-actions">
				<Button @click="handleDiscardChanges" class="ui-savebar-btn-restore">
					<div>
						descartar
						<span class="d-sm-none">alterações</span>
					</div>
				</Button>
				<Button variant="success" type="submit" leadingIcon="check" label="Salvar" />
			</div>
		</Container>
	</div>
</template>

<style lang="scss">
@import './Savebar.scss';
</style>
