<script setup lang="ts">
import { getCurrentInstance, onMounted, shallowRef, watchEffect } from 'vue'
import '@simonwep/pickr/dist/themes/classic.min.css' // 'classic' theme
import '@simonwep/pickr/dist/themes/monolith.min.css' // 'monolith' theme
import '@simonwep/pickr/dist/themes/nano.min.css' // 'nano' theme
import * as Pickr from '@simonwep/pickr'
import type PickerInterface from '@simonwep/pickr'

const props = defineProps<{
	modelValue: undefined
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

const listener = watchEffect(() => {
	if (pickr.value && props.modelValue) {
		pickr.value.setColor(props.modelValue)
	}
})

interface PickrCustom extends PickerInterface {
	hasDefault?: boolean
}

const createPickrInstance = (options: PickerInterface.Options) => {
	const noDefault = !options.default
	// @ts-expect-error
	const instance: PickrCustom = new Pickr({
		...options,
		...(noDefault && { default: '#000000' })
	})

	if (noDefault) {
		instance.hasDefault = false
		const resetColor = () => {
			instance.off('init', resetColor)
			instance.setColor(null)
			instance.hasDefault = true
		}

		instance.on('init', resetColor)
	}

	return instance
}

onMounted(() => {
	pickr.value = createPickrInstance({
		el: `#${uid}`,
		theme: 'monolith',
		default: props.modelValue,
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
		// swatches: [
		// 	'rgba(244, 67, 54, 1)',
		// 	'rgba(233, 30, 99, 0.95)',
		// 	'rgba(156, 39, 176, 0.9)',
		// 	'rgba(103, 58, 183, 0.85)',
		// 	'rgba(63, 81, 181, 0.8)',
		// 	'rgba(33, 150, 243, 0.75)',
		// 	'rgba(3, 169, 244, 0.7)',
		// 	'rgba(0, 188, 212, 0.7)',
		// 	'rgba(0, 150, 136, 0.75)',
		// 	'rgba(76, 175, 80, 0.8)',
		// 	'rgba(139, 195, 74, 0.85)',
		// 	'rgba(205, 220, 57, 0.9)',
		// 	'rgba(255, 235, 59, 0.95)',
		// 	'rgba(255, 193, 7, 1)'
		// ]
	})

	pickr.value
		.on('init', (instance: PickerInterface) => {
			listener()
		})
		.on('save', (color: PickerInterface.HSVaColor, instance: PickrCustom) => {
			if (instance.hasDefault) {
				let hexa = null

				if (color) {
					hexa = color.toHEXA().toString()
				}

				instance.hide()
				update(hexa)
			}
		})
	// .on('hide', (instance) => {
	// 	console.log('Event: "hide"', instance)
	// })
	// .on('show', (color, instance) => {
	// 	console.log('Event: "show"', color, instance)
	// 	// instance.applyColor('')
	// })

	// .on('clear', (instance) => {})
	// .on('change', (color, source, instance) => {
	// 	console.log('Event: "change"', color, source, instance)
	// })
	// .on('changestop', (source, instance) => {
	// 	console.log('Event: "changestop"', source, instance)
	// })
	// .on('cancel', (instance) => {
	// 	console.log('Event: "cancel"', instance)
	// })
	// .on('swatchselect', (color, instance) => {
	// 	console.log('Event: "swatchselect"', color, instance)
	// })
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
