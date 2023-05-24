<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, shallowRef, toRef, watchPostEffect } from 'vue'
import '@simonwep/pickr/dist/themes/monolith.min.css' // 'monolith' theme
import Pickr from '@simonwep/pickr/src/js/pickr'
import type PickerInterface from '@simonwep/pickr'
import FormLabel from '../form-label/FormLabel.vue'

const props = defineProps<{
	modelValue?: string | null
	switch?: boolean
	label?: string
	required?: boolean
	name?: string
	width?: string
	withInput?: boolean
}>()
const emit = defineEmits(['update', 'update:modelValue'])
const uid = `colopicker-${getCurrentInstance()?.uid}`
const pickr = shallowRef()
const focused = ref(false)
const customStyle = ref<{
	width?: string
}>({})

if (props.width) {
	customStyle.value.width = props.width
}

const update = (value: string | null) => {
	console.log(value)

	emit('update:modelValue', value)
	emit('update', value)
}

interface PickrCustom extends Pickr {
	init?: boolean
}

const createPickrInstance = (options: PickerInterface.Options) => {
	const noDefault = !options.default

	const instance: PickrCustom = Pickr.create({
		...options,
		...(noDefault && { default: '#000000' })
	})

	instance.init = true

	if (noDefault) {
		instance.init = false

		const resetColor = () => {
			instance.off('init', resetColor)
			instance.setColor(null)
			instance.init = true
		}

		instance.on('init', resetColor)
	}

	return instance
}

onMounted(() => {
	pickr.value = createPickrInstance({
		el: `#${uid}`,
		theme: 'monolith',
		default: props.modelValue || undefined,
		defaultRepresentation: 'HEXA',
		// container: 'body',
		// lockOpacity: true,
		components: {
			preview: true,
			opacity: true,
			hue: true,

			interaction: {
				// hex: true,
				// rgba: true,
				// hsla: true,
				// hsva: true,
				// cmyk: true,
				input: true,
				save: true,
				clear: true
			}
		},
		i18n: {
			// Strings visible in the UI
			'ui:dialog': 'color picker dialog',
			'btn:toggle': 'toggle color picker dialog',
			'btn:swatch': 'color swatch',
			'btn:last-color': 'use previous color',
			'btn:save': 'Aplicar',
			'btn:cancel': 'Cancelar',
			'btn:clear': 'Limpar',

			// Strings used for aria-labels
			'aria:btn:save': 'save and close',
			'aria:btn:cancel': 'cancel and close',
			'aria:btn:clear': 'clear and close',
			'aria:input': 'color input field',
			'aria:palette': 'color selection area',
			'aria:hue': 'hue selection slider',
			'aria:opacity': 'selection slider'
		}
	})

	pickr.value.on('save', (color: PickerInterface.HSVaColor, instance: PickrCustom) => {
		if (instance.init) {
			let hexa = null

			if (color) {
				hexa = color.toHEXA().toString()
			}

			instance.hide()

			if (!focused.value) update(hexa)
		}
	})

	watchPostEffect(() => {
		if (
			pickr.value &&
			props.modelValue != undefined &&
			pickr.value.getColor().toHEXA().toString() != props.modelValue
		) {
			pickr.value.setColor(props.modelValue)
		}
	})
})

watchPostEffect(() => {
	if (pickr.value && props.modelValue && !focused.value) {
		if (!focused.value) {
			pickr.value.setColor(props.modelValue)
		}
	}
})

defineExpose({
	show: () => {
		pickr.value.show()
	},
	hide: () => {
		pickr.value.hide()
	}
})
</script>

<template>
	<label class="ui-colorpicker" :style="customStyle">
		<FormLabel class="ui-colorpicker" :label="label" @click="pickr.show()" />
		<div class="ui-colorpicker-content">
			<div class="pickr" :id="uid"></div>
			<input
				v-if="withInput"
				class="form-control"
				maxlength="9"
				:value="modelValue"
				@focus="focused = true"
				@blur="focused = false"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
		</div>
	</label>
</template>

<style lang="scss">
@import './FormColorPicker.scss';
</style>
