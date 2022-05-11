<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import * as TomSelect from 'tom-select/dist/js/tom-select.complete.min.js'
import 'tom-select/dist/css/tom-select.default.css'
import FormLabel from '../form-label/FormLabel.vue'
import { cloneDeep } from 'lodash'

export interface Props {
	modelValue?: string | null
	placeholder?: string
	label?: string
	config?: object
}

export interface SettingsInterface {
	persist: boolean
	createOnBlur: boolean
	create: boolean
	plugins: string[]
	onChange(val: string): void
}

const emit = defineEmits(['update:modelValue', 'update', 'open', 'close'])

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Criar tags'
})

const uid = `ui-form-select-${getCurrentInstance()?.uid}`
const model = ref<string | null | undefined>(null)
const element = shallowRef()

const update = (val: string) => {
	emit('update:modelValue', val)
	emit('update', val)
}

const getSettings = () => {
	const newConfig: any = cloneDeep(props.config)
	const settings = {
		...{
			valueField: 'id',
			labelField: 'text',
			searchField: 'text',
			persist: true,
			createOnBlur: true,
			create: true,
			closeAfterSelect: true,
			plugins: [],
			onChange: update,
			options: [],
			onItemAdd: function () {
				this.setTextboxValue('')
				this.refreshOptions()
			}
		},
		...newConfig
	}

	settings.plugins.push('remove_button')

	return settings
}

const init = () => {
	console.log('init')

	nextTick(() => {
		if (element.value) {
			element.value.destroy()
		}
		//@ts-expect-error: sem interface
		element.value = new TomSelect(`#${uid}`, getSettings())
	})
}

const checkModelValue = () => {
	nextTick(() => {
		if (element.value) {
			// console.log(props.modelValue)
			// element.value.setValue(props.modelValue)
			init()
		}
	})
}

// watchEffect(() => {
// 	model.value = props.modelValue
// 	setTimeout(() => {
// 		if (element.value) {
// 			element.value.sync()
// 			init()
// 		}
// 	}, 250)
// })

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
	<div class="ui-form-tags">
		<FormLabel v-if="label" :text="label" />
		<input ref="selectRef" :id="uid" autocomplete="off" :placeholder="placeholder" />
	</div>
</template>

<style lang="scss">
@import './FormTags.scss';
</style>
