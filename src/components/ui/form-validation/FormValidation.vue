<script setup lang="ts">
import { each } from 'lodash'
import { watchEffect } from 'vue'

const props = defineProps<{
	modelValue: undefined
	translate: any
}>()

const emit = defineEmits(['update:modelValue'])

const trans = (val: string) => {
	if (!props.translate) {
		return val
	}
	if (val.indexOf('.') >= 0) {
		const keys = val.split('.')
		const key = keys[0]
		const line = Number(keys[1]) + 1
		const field = keys[2]
		const object = props.translate[key]
		if (object[field]) {
			const name = object[key]
			return `${name}: ${object[field]} #${line}`
		} else {
			return val
		}
	}
	return props.translate[val] || val
}

const removeErrors = () => {
	emit('update:modelValue', null)
}

watchEffect(() => {
	const newVal = props.modelValue

	for (var item of document.querySelectorAll("[class*='form-error-']")) {
		item.classList.remove('-invalid')
	}

	if (newVal) {
		window.scrollTo(0, 0)
		each(newVal, (item, key) => {
			const ele = document.getElementsByClassName(`error.${key}`)
			console.log(ele)
			if (ele[0]) {
				ele[0].classList.add('-invalid')
			}
		})
	}
})
</script>

<template>
	<div v-if="modelValue != null" class="mb-4">
		<alert variant="danger" show title="Erros encontrados" dismissible @dismissed="removeErrors">
			<ul v-for="(item, key) in modelValue" :key="key" class="text-lowercase">
				<li v-for="val in item" :key="val">
					<b>{{ trans(String(key)) }}:</b> {{ val }}
				</li>
			</ul>
		</alert>
	</div>
</template>
