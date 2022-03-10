<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'

// import 'select2/dist/js/select2.full'
// import 'select2/dist/css/select2.min.css'
// import $ from 'jquery'

const emit = defineEmits(['update:modelValue', 'open', 'close'])

interface Props {
	modelValue: undefined
	placeholder: string
	config: object
	multiple: boolean
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Selecione'
})

const instance = getCurrentInstance()
const uid = `select-${instance?.uid}`
const settings = ref({})
const model = ref(null)
const element = shallowRef()

settings.value = Object.assign(
	{
		data: [],
		allowClear: true,
		closeOnSelect: true,
		tags: false,
		multiple: props.multiple,
		placeholder: props.placeholder,
		tokenSeparators: [',', ' '],
		language: 'pt-BR',
		width: '100%'
	},
	props.config
)

const update = (val: null) => {
	emit('update:modelValue', val)
}

const updateSelect2 = (value: undefined) => {
	element.value.val(value).trigger('change')
}

onMounted(() => {
	element.value = $(`#${uid}`)
	element.value = element.value.select2(settings.value)

	element.value.on('select2:select', () => update(element.value.select2('val')))
	element.value.on('select2:unselecting', () => element.value.select2('close'))
	element.value.on('select2:open', (evt: any) => emit('open', evt))
	element.value.on('select2:clearing', () => {})
	element.value.on('select2:clear', () => {
		update(null)
		setTimeout(() => {
			element.value.select2('close')
		}, 50)
	})

	nextTick(() => {
		watchEffect(() => {
			updateSelect2(props.modelValue)
		})

		watch(
			() => props.config,
			(newVal) => {
				console.log(newVal)
			}
		)
	})
})
</script>

<template>
	<div class="ui-form-select">
		<select v-model="model" class="ui-select" :value="modelValue" :id="uid" :multiple="settings.multiple"></select>
	</div>
</template>

<style lang="scss">
@import '../../../../src/scss/mixins.scss';
@import './FormAutocomplete.scss';
</style>
