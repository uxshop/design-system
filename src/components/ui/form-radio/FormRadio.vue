<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

export interface Props {
	modelValue?: any
	value?: any
	label?: string
	name?: string
	required?: boolean
	disabled?: boolean
	tabindex?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	value: true
})

const emit = defineEmits(['update:modelValue', 'update'])
const uid = `ui-form-radio-${getCurrentInstance()?.uid}`

const isChecked = computed(() => {
	return JSON.stringify(props.value) == JSON.stringify(props.modelValue)
})

const update = (val: string | boolean) => {
	emit('update:modelValue', val)
	emit('update', val)
}
</script>

<template>
	<label class="ui-form-radio" :for="uid" :class="{ '-disabled': disabled }">
		<input
			type="radio"
			:id="uid"
			:modelValue="modelValue"
			:value="value"
			:tabindex="tabindex"
			:required="required"
			:name="name"
			:disabled="disabled"
			:checked="isChecked"
			@input="update(value)" />
		<span class="ui-form-radio-checkmark" />
		<div class="ui-form-radio-text" v-if="label || $slots.default">
			<slot>{{ label }}</slot>
		</div>
	</label>
</template>

<style lang="scss">
@import './FormRadio.scss';
</style>
