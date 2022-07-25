<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, watchEffect } from 'vue'
import './redactor/redactor'

export interface Props {
	modelValue?: any
	toolbar?: object
	name?: string
	placeholder?: string
	label?: string
	height?: string | number
	config?: Record<string, string>
	configCallbacks?: Record<string, () => {}>
}

type TRedactor = {
	editor: {
		focus(): void
		source: {
			setCode(val: any): void
		}
	}
} | null

const props = withDefaults(defineProps<Props>(), {
	height: 120
})

const emit = defineEmits(['update:modelValue', 'update'])

let redactor: TRedactor
let focused = false
const uid = `ui-form-richtext-${getCurrentInstance()?.uid}`
const config = Object.assign(
	{
		lang: 'pt_br',
		toolbarFixed: false,
		imagePosition: true,
		imageResizable: true,
		tabAsSpaces: 4,
		plugins: ['source', 'video', 'table', 'alignment', 'fullscreen', 'imagemanager'],
		buttons: ['html', 'formatting', 'bold', 'italic', 'lists', 'link', 'horizontalrule', 'image'],
		maxHeight: '600px',
		minHeight: `${props.height}px`,
		multipleUpload: false,
		callbacks: Object.assign({
			focus: function () {
				focused = true
			},
			blur: function () {
				focused = false
			},
			changed: (html: string) => {
				emit('update:modelValue', html)
				return html
			}
		}, props.configCallbacks)
	},
	props.config
)

const focus = () => {
	if (redactor) {
		redactor.editor.focus()
	}
}

onMounted(() => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line no-undef
	redactor = $R(`#${uid}`, config)
})

watchEffect(() => {
	const value = props.modelValue
	if (redactor && !focused) {
		redactor.editor.source.setCode(value)
	}
})

onUnmounted(() => {
	setTimeout(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line no-undef
		$R(`#${uid}`, 'destroy')
		redactor = null
	}, 300)
})
</script>

<template>
	<div class="ui-form-richtext">
		<label :for="name" v-if="label" class="form-control-label" @click="focus">{{ label }}</label>
		<textarea :name="name" :placeholder="placeholder" :value="modelValue" :id="uid" />
	</div>
</template>

<style lang="scss">
@import './FormRichtext.scss';
</style>
