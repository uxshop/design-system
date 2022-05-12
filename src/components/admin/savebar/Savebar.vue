<script setup lang="ts">
import { isFunction } from 'lodash-es'
import { computed, inject } from 'vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Button from '../../ui/button/Button.vue'
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
		<Row alignV="center">
			<Col></Col>
			<Col cols="auto" class="ml-auto">
				<Button @click="handleDiscardChanges" class="btn-restore">
					<div>
						descartar
						<span class="d-sm-none">alterações</span>
					</div>
				</Button>
				<Button variant="success" type="submit" leadingIcon="check"> Salvar </Button>
			</Col>
		</Row>
	</div>
</template>

<style lang="scss">
@import './savebar.scss';
</style>
