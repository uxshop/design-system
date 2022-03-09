<script setup lang="ts">
import { ref } from 'vue'
// import { useCurrencyInput } from 'vue-currency-input'

const props = defineProps<{
	modelValue: string | number
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
	minlength: [string, number]
	maxlength: [string, number]
	autofocus: boolean
	disabled: boolean
	required: boolean
	readonly: boolean
	pill: boolean
	options: object
}>()

const classList = ref<string[]>([])

/* @see https://dm4t2.github.io/vue-currency-input/config.html */

const emit = defineEmits

// const { inputRef } = useCurrencyInput(options)

if (props.pill) {
	classList.value.push('-pill')
}
</script>

<template>
	<form-wrapper
		v-bind="{
			id: $props.id,
			leadingIcon: $props.leadingIcon,
			trailingIcon: $props.trailingIcon,
			label: $props.label,
			loading: $props.loading,
			last: $props.last,
			disabled: $props.disabled,
			float: $props.float,
			state: $props.state
		}"
	>
		<input ref="inputRef" class="form-control" />
	</form-wrapper>
</template>
