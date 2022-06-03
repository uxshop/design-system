<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, shallowRef, watch } from 'vue'
import * as Choices from 'choices.js'
import FormLabel from '../form-label/FormLabel.vue'
import { cloneDeep, isArray } from 'lodash-es'

export interface Props {
	modelValue?: any
	placeholder?: string
	label?: string
	config?: any
}

export interface SettingsInterface {
	persist: boolean
	createOnBlur: boolean
	create: boolean
	plugins: string[]
	onChange(val: string): void
}

const emit = defineEmits(['update:modelValue', 'update', 'open', 'close', 'add'])

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Criar tags'
})

const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const element = shallowRef()

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const getSettings = () => {
	const newConfig: any = cloneDeep(props.config)
	const settings = {
		...{
			searchEnabled: true,
			searchChoices: true,
			removeItems: true,
			removeItemButton: true,
			addItems: true,
			create: false,
			placeholder: true,
			placeholderValue: props.placeholder || 'Selecione',
			noResultsText: 'Nenhum resultado encontrado',
			noChoicesText: 'Sem opções para escolher',
			items: [],
			choices: [
				// {
				// 	value: 'opt_1',
				// 	label: 'Option 1',
				// 	selected: true,
				// 	disabled: false
				// }
			],
			allowHTML: true
		},
		...newConfig
	}

	return settings
}

const init = () => {
	window.Choices = window.Choices ?? Choices

	nextTick(() => {
		if (element.value) {
			element.value.destroy()
		}

		const el = document.querySelector(`#${uid}`)
		if (el) {
			element.value = new Choices(el, getSettings())

			el.addEventListener(
				'change',
				function (event) {
					update(element.value.getValue(true))
					// element.value.hideDropdown()
				},
				false
			)
			el.addEventListener(
				'addItem',
				function (event) {
					emit('add', event.detail)
				},
				false
			)
			// el.addEventListener(
			// 	'removeItem',
			// 	function (event) {
			// 		console.log(event.detail)
			// 	},
			// 	false
			// )
		}
	})
}

const checkModelValue = () => {
	nextTick(() => {
		if (element.value) {
			if (props.modelValue && !isArray(props.modelValue)) {
				const val = props.modelValue.split(',')
				console.log(props.modelValue, val)
				element.value.setValue(val)
			}
		}
	})
}

onMounted(init)

watch(
	() => props.modelValue,
	() => {
		checkModelValue()
	}
)

watch(
	() => [props.config],
	() => init(),
	{ deep: true }
)
</script>

<template>
	<div class="ui-form-tags" :class="{ '-has-value': modelValue?.length }">
		<FormLabel v-if="label" :label="label" />
		<input
			v-if="getSettings().create"
			ref="selectRef"
			:id="uid"
			type="text"
			autocomplete="off"
			:placeholder="placeholder" />
		<select v-else multiple ref="selectRef" :id="uid" type="text" autocomplete="off" />
	</div>
</template>

<style lang="scss">
@import 'choices.js/src/styles/choices.scss';
@import './FormTags.scss';
</style>
