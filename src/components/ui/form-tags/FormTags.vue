<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, shallowRef, watch } from 'vue'
import * as Choices from 'choices.js'
import FormLabel from '../form-label/FormLabel.vue'
import { cloneDeep, isArray } from 'lodash-es'
import Button from '../button/Button.vue'

export interface Props {
	modelValue?: any
	placeholder?: string
	label?: string
	config?: any
	closeOnSelect?: boolean
	last?: boolean
	actions?: any
	options?: any
	create?: boolean
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
	placeholder: 'Criar tags',
	create: true,
	options: []
})

let settings = {
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
	choices: [],
	allowHTML: true
}
const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const element = shallowRef()
const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const init = () => {
	// @ts-ignore
	window.Choices = window.Choices ?? Choices

	nextTick(() => {
		const el = document.querySelector(`#${uid}`)

		if (element.value) {
			element.value.destroy()
		}

		if (el) {
			console.log('init')
			const settings = {
				searchEnabled: true,
				searchChoices: true,
				removeItems: true,
				removeItemButton: true,
				addItems: true,
				position: 'bottom',
				create: false,
				placeholder: true,
				placeholderValue: props.placeholder || 'Selecione',
				noResultsText: 'Nenhum resultado encontrado',
				noChoicesText: 'Sem opções para escolher',
				items: [],
				choices: cloneDeep(props.options),
				allowHTML: true
			}
			// settings.choices = cloneDeep(props.options)

			// @ts-ignore
			element.value = new window.Choices(el, settings)

			checkModelValue()

			el.addEventListener(
				'change',
				function (event) {
					const val = element.value.getValue(true)

					update(val.join(','))

					if (props.closeOnSelect) {
						element.value.hideDropdown()
					}
				},
				false
			)
			el.addEventListener(
				'addItem',
				function (event: any) {
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
			const data = getValueArray()

			if (props.create) {
				if (isArray(data)) {
					element.value.clearStore()
					element.value.setValue(data)
				}
			}
		}
	})
}

const getValueArray = () => {
	if (props.modelValue && !isArray(props.modelValue)) {
		return props.modelValue.split(',')
	}

	return props.modelValue
}

watch(
	() => props.modelValue,
	() => checkModelValue(),
	{ immediate: true }
)

watch(
	() => [props.options],
	() => init(),
	{ immediate: true, deep: true }
)
</script>

<template>
	<div class="ui-form-tags" :class="{ '-has-value': modelValue?.length, 'mb-0': last }">
		<FormLabel
			v-if="label"
			:label="label"
			:action="{
				label: 'Remover'
			}" />
		<div class="ui-form-tags-content">
			<input v-if="props.create" ref="selectRef" :id="uid" type="text" autocomplete="off" :placeholder="placeholder" />
			<select v-else multiple ref="selectRef" :id="uid" type="text" autocomplete="off" />
			<div v-if="actions" class="ui-form-tags-actions">
				<Button v-for="item in actions" :label="item.label" @click="item.onAction" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import 'choices.js/src/styles/choices.scss';
@import './FormTags.scss';
</style>
