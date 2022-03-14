<script setup lang="ts">
import { isFunction } from 'lodash-es'
import { computed, inject } from 'vue'
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
		<ui-row alignV="center">
			<ui-col></ui-col>
			<ui-col cols="auto" class="ml-auto">
				<ui-button @click="handleDiscardChanges" variant="light" class="btn-restore">
					<div>
						descartar
						<span class="d-sm-none">alterações</span>
					</div>
				</ui-button>
				<ui-button variant="success" type="submit" leadingIcon="check"> Salvar </ui-button>
			</ui-col>
		</ui-row>
	</div>
</template>

<style lang="scss">
@import './savebar.scss';
</style>
