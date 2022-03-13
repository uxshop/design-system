<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef } from 'vue'
import * as TomSelect from 'tom-select/dist/js/tom-select.complete.min.js'
import 'tom-select/dist/css/tom-select.default.css'

const emit = defineEmits(['update:modelValue', 'update', 'open', 'close'])

interface Props {
	modelValue: string
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
const model = ref(null)
const element = shallowRef()

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const settings: SettingsInterface = Object.assign(
	{
		persist: false,
		createOnBlur: true,
		create: true,
		plugins: [],
		onChange: update
	},
	props.config
)

settings.plugins.push('remove_button')

onMounted(() => {
	nextTick(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		element.value = new TomSelect(`#${uid}`, settings)
		// 	element.value = $(`#${uid}`)
		// 	element.value = element.value.select2(settings)
		// 	element.value.on('select2:select', () => update(element.value.select2('val')))
		// 	element.value.on('select2:unselecting', () => element.value.select2('close'))
		// 	element.value.on('select2:open', (evt) => emit('open', evt))
		// 	watchEffect(() => {
		// 		updateSelect2(props.modelValue)
		// 	})
		// 	watch(
		// 		() => props.config,
		// 		(newVal) => {
		// 			console.log(newVal)
		// 		}
		// 	)
	})
})
</script>

<template>
	<div class="ui-form-tags">
		<input v-model="model" ref="selectRef" :id="uid" autocomplete="off" :placeholder="placeholder" />
	</div>
</template>

<style lang="scss">
@import './FormTags.scss';
</style>
