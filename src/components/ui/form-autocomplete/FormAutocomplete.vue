<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import * as TomSelect from 'tom-select/dist/js/tom-select.complete.min.js'
import 'tom-select/dist/css/tom-select.default.css'
import { config } from 'process'
import { clone, cloneDeep, keys } from 'lodash'

const emit = defineEmits(['update:modelValue', 'open', 'close', 'update'])

interface ConfigInterface {
	persist?: boolean
	createOnBlur?: boolean
	create?: boolean
	closeAfterSelect?: boolean
	plugins?: string[]
	searchField?: string
	labelField?: string
	options?: any[]
	render?: {
		option?: () => string
		item?: () => string
		option_create?: () => string
		no_results?: () => string
		not_loading?: () => string
		optgroup?: () => HTMLElement
		optgroup_header?: () => string
		loading?: () => string
		dropdown?: () => string
	}
	onChange?: (val: string) => void
}

interface Props {
	modelValue?: any
	options?: any[]
	placeholder?: string
	config?: ConfigInterface
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Selecione',
	config: () => ({})
})

const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const model = ref<string | null | undefined>(null)
const element = shallowRef()

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const getSettings = () => {
	const newConfig: ConfigInterface = cloneDeep(props.config)

	if (newConfig.labelField && !newConfig.searchField) {
		newConfig.searchField = newConfig.labelField
	}

	const config: ConfigInterface = {
		...{
			plugins: [],
			persist: false,
			createOnBlur: false,
			create: false,
			closeAfterSelect: true,
			valueField: 'id',
			labelField: 'text',
			searchField: 'text',
			options: cloneDeep(props.options),
			onChange: update
		},
		...newConfig
	}

	return config
}

const init = () => {
	nextTick(() => {
		if (element.value) {
			element.value.destroy()
			console.log('destroy')
		}

		console.log('init')
		// @ts-expect-error: no interface
		element.value = new TomSelect(`#${uid}`, getSettings())
	})
}

const checkModelValue = () => {
	nextTick(() => {
		if (element.value) {
			element.value.setValue(props.modelValue)
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
	<div class="ui-form-autocomplete">
		<select :value="model" class="ui-form-select" :id="uid" :placeholder="placeholder"></select>
	</div>
</template>

<style lang="scss">
@import './FormAutocomplete.scss';
</style>
