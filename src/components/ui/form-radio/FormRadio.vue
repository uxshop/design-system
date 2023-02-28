<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

export interface Props {
	modelValue?: any
	value?: string | number | boolean
	label?: string
	name?: string
	required?: boolean
	noEvents?: boolean
	disabled?: boolean
	size?: string
	tabindex?: string | number
}

const props = withDefaults(defineProps<Props>(), {
	value: true
})

const emit = defineEmits(['update:modelValue', 'update'])
const uid = `ui-form-radio-${getCurrentInstance()?.uid}`

const model = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		update(newValue)
	}
})

const update = (val: string | boolean) => {
	console.log(val)

	emit('update:modelValue', val)
	emit('update', val)
}
</script>

<template>
	<label class="ui-form-radio" :for="uid" :class="{ 'no-events': noEvents }">
		<input
			type="radio"
			:id="uid"
			:value="value"
			:tabindex="tabindex"
			:required="required"
			:name="name"
			:disabled="disabled"
			@input="update($event.target.value)" />
		<span class="ui-form-radio-checkmark" />
		<div class="ui-form-radio-text" v-if="label || $slots.default">
			<slot>{{ label }}</slot>
		</div>
	</label>
</template>

<style lang="scss">
@import './FormRadio.scss';
</style>
