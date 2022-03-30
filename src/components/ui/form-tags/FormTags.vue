<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef, watchEffect } from 'vue'
import * as TomSelect from 'tom-select/dist/js/tom-select.complete.js'
import 'tom-select/dist/css/tom-select.default.css'
import { isString } from 'lodash'

const emit = defineEmits(['update:modelValue', 'update', 'open', 'close'])

interface Props {
	modelValue?: string
	placeholder?: string
	config?: object
}

interface SettingsInterface {
	persist: boolean
	createOnBlur: boolean
	create: boolean
	plugins: string[]
	onChange(val: string): void
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Selecione'
})

const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const model = ref<string | null>(null)
const element = shallowRef()

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const settings: SettingsInterface = Object.assign(
	{
		persist: true,
		createOnBlur: true,
		create: true,
		plugins: [],
		onChange: update
		// items: ['opt1'],
		// options: ['opt1']
	},
	props.config
)

settings.plugins.push('remove_button')

onMounted(() => {
	nextTick(() => {
		// @ts-expect-error: no interface
		element.value = new TomSelect(`#${uid}`, settings)
	})
})

watchEffect(() => {
	model.value = props.modelValue
	setTimeout(() => {
		if (element.value) {
			element.value.sync()
		}
	}, 250)
})
</script>

<template>
	<div class="ui-form-tags">
		<input :value="modelValue" ref="selectRef" :id="uid" autocomplete="off" :placeholder="placeholder" />
	</div>
</template>

<style lang="scss">
@import './FormTags.scss';
</style>
