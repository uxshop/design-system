<script setup lang="ts">
import { ref } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'

interface Props extends FormWrapperInterface {
	modelValue: string | number
	rows: string | number
	label: string
	placeholder: string
	tabindex: string
	inputmode: string
	size: string
	id: string
	pattern: string
	title: string
	name: string
	autocomplete: string
	minlength: string | number
	maxlength: string | number
	autofocus: boolean
	disabled: boolean
	required: boolean
	readonly: boolean
	pill: string
}

const props = withDefaults(defineProps<Props>(), {
	rows: 4
})

const classList = ref<string[]>([])

if (props.pill) {
	classList.value.push('-pill')
}
</script>

<template>
	<form-wrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:label="label"
		:coutable="coutable"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:float="float"
		:state="state"
	>
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
			:rows="rows"
		/>
	</form-wrapper>
</template>
