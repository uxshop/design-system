<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'

const props = defineProps<{
	modelValue?: any
	switch?: boolean
	label?: string
	name?: string
	value?: any
	size?: string
	tabindex?: string | number
	required?: boolean
	indeterminate?: boolean
}>()

const uid = `ui-form-checkbox-${getCurrentInstance()?.uid}`
const switcher = ref(props.switch)
const classList = ref<string[]>([])

if (props.size) {
	classList.value.push(`-${props.size}`)
}

const emit = defineEmits(['update:modelValue'])

const update = (val: any) => {
	emit('update:modelValue', val)
}
</script>

<template>
	<label class="ui-form-checkbox" :for="uid" :class="classList">
		<input
			v-model="modelValue"
			type="checkbox"
			:id="uid"
			:class="{ '-switch': switcher }"
			:value="value"
			:tabindex="tabindex"
			:required="required"
			:indeterminate="indeterminate"
			:name="name"
			@update:modelValue="update"
		/>
		<div class="ui-form-checkbox-text"><slot />{{ label }}</div>
	</label>
</template>

<style lang="scss">
@import '../../../scss/mixins.scss';
@import './FormCheckbox.scss';
</style>
