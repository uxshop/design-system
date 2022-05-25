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
	disabled?: boolean
}>()

const uid = `ui-form-checkbox-${getCurrentInstance()?.uid}`
const classList = ref<string[]>([])
const model = ref()

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.noEvents) {
	classList.value.push(`-no-events`)
}
if (props.switch) {
	classList.value.push(`-switch`)
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
	<label class="ui-form-checkbox" :for="uid" :class="[classList, { '-disabled': disabled }]">
		<input
			v-model="model"
			type="checkbox"
			:id="uid"
			:value="value"
			:tabindex="tabindex"
			:required="required"
			:indeterminate="indeterminate"
			:name="name"
			:disabled="disabled"
			:true-value="true"
			@update:modelValue="update" />
		<span class="ui-form-checkbox-checkmark"></span>
		<div class="ui-form-checkbox-text" v-if="label || $slots.default">
			<slot>{{ label }}</slot>
		</div>
	</label>
</template>

<style lang="scss">
@import './FormCheckbox.scss';
</style>
