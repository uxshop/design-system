<script setup lang="ts">
import { each } from 'lodash'
import { watchEffect } from 'vue'

const props = defineProps<{
	modelValue: undefined
	translate: object
}>()

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
					<b>{{ trans(key) }}:</b> {{ val }}
				</li>
			</ul>
		</alert>
	</div>
</template>
