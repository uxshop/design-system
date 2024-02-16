<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue'
import Modal from '../../ui/modal/Modal.vue'
import FormLayoutItem from '../../ui/form-layout/FormLayoutItem.vue'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'
import Stack from '../../ui/stack/Stack.vue'
import Button from '../../ui/button/Button.vue'
import { isMobile } from '../../../helpers'
import FormSelect, { type IFormSelectOptions } from '../../ui/form-select/FormSelect.vue'

export interface IQuickSearchFormValue {
	searchType: string
	searchKey: string
}

const props = withDefaults(
	defineProps<{
		title?: string
		caption?: string
		searchOptions: IFormSelectOptions[]
		modelValue: boolean
		placeholder?: string
		buttonLabel?: string
	}>(),
	{
		title: 'Busca rápida',
		caption: 'Encontre o que precisa na sua loja virtual.',
		placeholder: 'Ex: Camiseta Bagy',
		buttonLabel: 'Pesquisar'
	}
)
const emit = defineEmits(['onSubmit', 'update:modelValue', 'onChangeOption'])

const isVisible = computed({
	get: () => props.modelValue,
	set: (value: any) => {
		emit('update:modelValue', value)
	}
})

const formValues = ref<IQuickSearchFormValue>({
	searchKey: '',
	searchType: props.searchOptions[0].value
})

function resetSearchValues() {
	formValues.value = {
		searchKey: '',
		searchType: props.searchOptions[0].value
	}
}

function onSubmit() {
	emit('onSubmit', formValues.value)
	resetSearchValues()
}

function onChange(value: string) {
	emit('onChangeOption', value)
}
</script>
<template>
	<Modal class="modal-container" v-model="isVisible" :title="title" :caption="caption">
		<form v-on:submit.prevent="onSubmit">
			<Stack class="form">
				<FormLayoutItem>
					<FormSelect v-model="formValues.searchType" :options="searchOptions" name="searchType" @update="onChange" />
				</FormLayoutItem>
				<FormTextfield v-model="formValues.searchKey" name="searchKey" :placeholder="placeholder" />
				<Button leadingIcon="search" type="submit" :block="isMobile" variant="primary">{{ buttonLabel }}</Button>
			</Stack>
		</form>
	</Modal>
</template>
<style lang="scss">
@import './QuickSearch.scss';
</style>
