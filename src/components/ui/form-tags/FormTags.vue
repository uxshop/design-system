<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef } from 'vue'
import * as TomSelect from 'tom-select/dist/js/tom-select.complete.min.js'
import 'tom-select/dist/css/tom-select.default.css'

const emit = defineEmits(['update:modelValue', 'update', 'open', 'close'])

interface Props {
	modelValue: undefined
	placeholder?: string
	config?: object
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Selecione'
})

const instance = getCurrentInstance()
const uid = `select-${instance?.uid}`
const model = ref(null)
const element = shallowRef()

const update = (val: any) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const settings = Object.assign(
	{
		persist: false,
		createOnBlur: true,
		create: true,
		plugins: <string[]>[],
		onChange: update
	},
	props.config
)

settings.plugins.push('remove_button')

onMounted(() => {
	nextTick(() => {
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
@import '../../../../src/scss/mixins.scss';
@import './FormTags.scss';
</style>
