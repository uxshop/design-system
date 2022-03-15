<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef, watchEffect } from 'vue'
import '@simonwep/pickr/dist/themes/classic.min.css' // 'classic' theme
import '@simonwep/pickr/dist/themes/monolith.min.css' // 'monolith' theme
import '@simonwep/pickr/dist/themes/nano.min.css' // 'nano' theme
import * as Pickr from '@simonwep/pickr'
import type PickerInterface from '@simonwep/pickr'

const props = defineProps<{
	modelValue?: string | null
	switch?: boolean
	label?: string
	required?: boolean
	name?: string
}>()
const emit = defineEmits(['update', 'update:modelValue'])
const uid = `colopicker-${getCurrentInstance()?.uid}`
const pickr = shallowRef()

const update = (value: string | null) => {
	emit('update:modelValue', value)
	emit('update', value)
}

watchEffect(() => {
	if (pickr.value && props.modelValue) {
		pickr.value.setColor(props.modelValue)
	}
})

interface PickrCustom extends PickerInterface {
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
			update(hexa)
		}
	})
	watchEffect(() => {
		if (
			pickr.value &&
			props.modelValue != undefined &&
			pickr.value.getColor().toHEXA().toString() != props.modelValue
		) {
			pickr.value.setColor(props.modelValue)
		}
	})
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
	<label class="ui-colorpicker">
		<div class="pickr" :id="uid"></div>
	</label>
</template>

<style lang="scss">
@import './FormColorPicker.scss';
</style>
