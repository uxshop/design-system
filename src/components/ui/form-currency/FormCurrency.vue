<script setup lang="ts">
import { ref } from 'vue'
// import { useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input'
// import useCurrencyInput from 'vue-currency-input/dist/index.esm.js'
import FormWrapper from '../form-wrapper/FormWrapper.vue'

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
	modelValue?: string | number
	label?: string
	placeholder?: string
	tabindex?: string
	inputmode?: string
	size?: string
	id?: string
	pattern?: string
	title?: string
	name?: string
	autocomplete?: string
	minlength?: [string, number]
	maxlength?: [string, number]
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	pill?: boolean
	options?: Record<string, unknown>
}

const props = defineProps<Props>()
const classList = ref<string[]>([])

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
// const settings: CurrencyInputOptions = {
// 	...{
// 		locale: 'pt-BR',
// 		currency: 'BRL',
// 		// currencyDisplay: 'symbol',
// 		hideCurrencySymbolOnFocus: false,
// 		hideGroupingSeparatorOnFocus: false,
// 		// hideNegligibleDecimalDigitsOnFocus: true,
// 		autoDecimalDigits: true,
// 		// valueScaling: 'precision',
// 		// autoSign: true,
// 		useGrouping: true
// 		// accountingSign: false
// 	},
// 	...props.options
// }
// const { inputRef } = useCurrencyInput(settings)
// const number = Number('1200.00')
// console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number))

if (props.pill) {
	classList.value.push('-pill')
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
		:state="state"
		:invalidFeedback="invalidFeedback">
		<input ref="inputRef" class="form-control" :value="modelValue" />
	</FormWrapper>
</template>
