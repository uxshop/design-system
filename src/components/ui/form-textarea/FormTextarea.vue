<script setup lang="ts">
import { ref } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import type { Size } from 'src/types';

interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	trailingText?: string
	state?: boolean
	loading?: boolean
	last?: boolean
	float?: boolean
	invalidFeedback?: string
	modelValue?: any
	rows?: string | number
	label?: string
	placeholder?: string
	tabindex?: string
	inputmode?: 'search' | 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal'
	size?: Size
	id?: string
	pattern?: string
	title?: string
	name?: string
	autocomplete?: string
	minlength?: string | number
	maxlength?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	pill?: string
}

const emit = defineEmits<{
	(e: 'update:modelValue', val: string): void
	(e: 'update', val: string): void
}>()

const props = withDefaults(defineProps<Props>(), {
	rows: 4
})

const classList = ref<string[]>([])

if (props.pill) {
	classList.value.push('-pill')
}

const update = (evt: Event) => {
	const target = evt.target as HTMLTextAreaElement
	emit('update:modelValue', target.value)
	emit('update', target.value)
}
</script>

<template>
	<FormWrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:label="label"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:float="float"
		:state="state">
		<textarea
			class="form-control"
			@input="update"
			:value="modelValue"
			:class="classList"
			:inputmode="inputmode"
			:autocomplete="autocomplete"
			:autofocus="autofocus"
			:disabled="disabled"
			:minlength="minlength"
			:maxlength="maxlength"
			:pattern="pattern"
			:placeholder="placeholder"
			:readonly="readonly"
			:tabindex="tabindex"
			:name="name"
			:title="title"
			:id="id"
			:required="required"
			:rows="rows" />
	</FormWrapper>
</template>
