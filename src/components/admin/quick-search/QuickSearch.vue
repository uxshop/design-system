<script setup lang="ts">
import { ref, withDefaults, watch, shallowRef } from 'vue'
import Modal from '../../ui/modal/Modal.vue'
import FormLayoutItem from '../../ui/form-layout/FormLayoutItem.vue'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'
import Stack from '../../ui/stack/Stack.vue'
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
		isOpen: boolean
	}>(),
	{ title: 'Busca rápida', caption: 'Encontre o que precisa na sua loja virtual.' }
)
const emits = defineEmits(['onSubmit', 'update:isOpen'])
const isOpenRef = shallowRef(props.isOpen)

const formValues = ref<IQuickSearchFormValue>({
	searchKey: '',
	searchType: props.searchOptions[0].value
})

function onSubmit(ev: Event) {
	emits('onSubmit', formValues.value)
}

watch(
	() => props.isOpen,
	(value) => {
		isOpenRef.value = value
	}
)

watch(
	() => isOpenRef.value,
	(value) => {
		emits('update:isOpen', value)
	}
)
</script>
<template>
	<Modal class="modal-container" v-model="isOpenRef" :title="title">
		<template #caption>
			<p class="caption-text">
				{{ caption }}
			</p>
		</template>
		<form v-on:submit.prevent="onSubmit">
			<Stack class="form">
				<FormLayoutItem>
					<FormSelect v-model="formValues.searchType" :options="searchOptions" name="searchType" />
				</FormLayoutItem>
				<FormTextfield v-model="formValues.searchKey" trailingIcon="search" name="searchKey" />
			</Stack>
		</form>
	</Modal>
</template>
<style lang="scss">
@import './QuickSearch.scss';
</style>
