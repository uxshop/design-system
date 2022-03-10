<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, shallowRef, watchEffect } from 'vue'

// import 'quill/dist/quill.bubble.css'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import Quill from 'quill'

interface Props {
	modelValue: undefined
	toolbar: object
	height: string | number
}

const props = withDefaults(defineProps<Props>(), {
	height: 100
})

const emit = defineEmits(['update', 'update:modelValue'])

const style = ref<{
	height?: string
}>({})

const uid = `ui-form-richtext-${getCurrentInstance()?.uid}`

const editor = shallowRef()

const config = Object.assign(
	{
		theme: 'snow'
	},
	{
		modules: {
			toolbar: props.toolbar
		}
	}
)

onMounted(() => {
	const container = document.getElementById(uid)
	editor.value = new Quill(container, config)

	editor.value.on('text-change', function (_delta: any, _oldDelta: any, source: string) {
		if (source == 'user') {
			stopWatch()
			const text = editor.value.getText()
			update(text)
		}
	})
})

const stopWatch = watchEffect(() => {
	if (editor.value && props.modelValue) {
		// editor.value.setContents(props.modelValue)
		editor.value.root.innerHTML = props.modelValue
	}
})

const update = (val: any) => {
	emit('update:modelValue', val)
	emit('update', val)
}

style.value.height = `${props.height}px`
</script>

<template>
	<div class="ui-form-richtext" :id="uid" :style="style" />
</template>

<style lang="scss">
@import './FormRichtextQuill.scss';
</style>
