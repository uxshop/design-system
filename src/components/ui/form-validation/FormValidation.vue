<script setup lang="ts">
import { each } from 'lodash'
import { watchEffect } from 'vue'
import Alert from '../alert/Alert.vue'

const props = defineProps<{
	modelValue: string
	translate: Record<string, Record<string, string>>
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
	// eslint-disable-next-line no-undef
	const items: NodeListOf<HTMLElement> | undefined = document.querySelectorAll("[class*='form-error-']")

	each(items, (item: HTMLElement) => {
		item.classList.remove('-invalid')
	})

	// for (var item of items) {
	// 	item.classList.remove('-invalid')
	// 	// items[item].classList.remove('-invalid')
	// }

	if (newVal) {
		window.scrollTo(0, 0)
		each(newVal, (item, key) => {
			const ele = document.getElementsByClassName(`error.${key}`)
			if (ele[0]) {
				ele[0].classList.add('-invalid')
			}
		})
	}
})
</script>

<template>
	<div v-if="modelValue != null" class="mb-4">
		<Alert variant="danger" show title="Erros encontrados" dismissible @dismissed="removeErrors">
			<ul v-for="(item, key) in modelValue" :key="key" class="text-lowercase">
				<li v-for="val in item" :key="val">
					<b>{{ trans(String(key)) }}:</b> {{ val }}
				</li>
			</ul>
		</Alert>
	</div>
</template>
