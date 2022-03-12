<script setup lang="ts">
import { ref } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import { maska } from 'maska'
const vMaska = maska

interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	trailingText?: string
	state?: undefined
	coutable?: boolean
	loading?: boolean
	last?: boolean
	float?: boolean
	invalidFeedback?: string
	//
	modelValue: any
	label?: string
	id?: string
	placeholder?: string
	step?: string | number
	tabindex?: string
	inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal'
	size?: string
	pattern?: string
	title?: string
	name?: string
	pill?: boolean
	autocomplete?: string
	minlength?: string | number
	maxlength?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	type?: string
	mask?: string | string[] | object | null
	raw?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(e: 'update:modelValue', val: string): void
	(e: 'update', val: string): void
	(e: 'focus'): void
	(e: 'blur'): void
	(e: 'keydown'): void
	(e: 'enter'): void
}>()

const classList = ref<string[]>([])
const rawValue = ref()

const update = (evt: any) => {
	let val = evt.target?.value
	if (props.mask && props.raw) {
		val = rawValue.value
	}
	emit('update:modelValue', val)
	emit('update', val)
}

if (props.pill) {
	classList.value.push('-pill')
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

const onFocus = emit('focus')
const onBlur = emit('blur')
const onKeydown = emit('keydown')
const onEnter = emit('enter')
</script>

<template>
	<FormWrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:trailingText="trailingText"
		:label="label"
		:coutable="coutable"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:float="float"
		:state="state"
		:labelInfo="labelInfo"
		:autofocus="autofocus"
		:size="size"
		:invalidFeedback="invalidFeedback"
		class="ui-form-textfield"
	>
		<slot name="before" />
		<input
			v-maska="mask"
			class="form-control"
			@input="update"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
			@keyup.enter="onEnter"
			:type="type"
			:step="step"
			:value="modelValue"
			:class="classList"
			:inputmode="inputmode"
			:autocomplete="autocomplete"
			:disabled="disabled"
			:minlength="minlength"
			:maxlength="maxlength"
			:pattern="pattern"
			:autofocus="autofocus"
			:placeholder="!float ? placeholder : ''"
			:readonly="readonly"
			:tabindex="tabindex"
			:name="name"
			:title="title"
			:id="id"
			:required="required"
			@maska="rawValue = $event.target.dataset.maskRawValue"
		/>
		<slot name="after" />
	</FormWrapper>
</template>
