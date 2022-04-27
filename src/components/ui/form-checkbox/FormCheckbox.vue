<script setup lang="ts">
import { getCurrentInstance, ref, watchEffect } from 'vue'

const emit = defineEmits(['update:modelValue', 'update'])
const props = defineProps<{
	modelValue?: unknown
	value?: unknown
	switch?: boolean
	label?: string
	name?: string
	size?: string
	tabindex?: string | number
	required?: boolean
	indeterminate?: boolean
	noEvents?: boolean
}>()

const uid = `ui-form-checkbox-${getCurrentInstance()?.uid}`
const switcher = ref(props.switch)
const classList = ref<string[]>([])
const model = ref()

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.noEvents) {
	classList.value.push(`-no-events`)
}

watchEffect(() => {
	model.value = props.modelValue
})

const update = (val: unknown) => {
	emit('update', val)
	emit('update:modelValue', val)
}
</script>

<template>
	<label class="ui-form-checkbox" :for="uid" :class="classList">
		<input
			v-model="model"
			type="checkbox"
			:id="uid"
			:class="{ '-switch': switcher }"
			:value="value"
			:tabindex="tabindex"
			:required="required"
			:indeterminate="indeterminate"
			:name="name"
			:true-value="true"
			@update:modelValue="update" />
		<div class="ui-form-checkbox-text"><slot />{{ label }}</div>
	</label>
</template>

<style lang="scss">
@import './FormCheckbox.scss';
</style>
