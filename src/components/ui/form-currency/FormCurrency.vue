<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input'
import FormWrapper from '../form-wrapper/FormWrapper.vue'

export interface Props {
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
	modelValue?: string | number | null
	label?: string
	placeholder?: any
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
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	placeholder: '0.00'
})
const classList = ref<string[]>([])
const price = ref()
const focused = ref(false)

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
const settings: CurrencyInputOptions = {
	...{
		locale: 'pt-BR',
		currency: 'BRL',
		currencyDisplay: 'symbol',
		hideCurrencySymbolOnFocus: false,
		hideGroupingSeparatorOnFocus: false,
		hideNegligibleDecimalDigitsOnFocus: false,
		autoDecimalDigits: true,
		autoSign: true,
		useGrouping: true,
		accountingSign: false
		// precision: 2
	},
	...props.options
}

const { inputRef, setValue } = useCurrencyInput(settings)
// const number = Number('1200.00')
// console.log(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number))

if (props.pill) {
	classList.value.push('-pill')
}

const init = () => {
	// const mask = SimpleMaskMoney
	// const options = {
	// 	afterFormat: function (e) {
	// 		let val = e.replace(/^\D{0,3}/g, '')
	// 		val = val.replace(/\./g, '')
	// 		val = val.replace(/\,/g, '.')
	// 		console.log('after:', val)
	// 	},
	// 	allowNegative: false,
	// 	beforeFormat: function (e) {
	// 		// console.log('before: ', e)
	// 	},
	// 	cursor: 'end',
	// 	decimalSeparator: ',',
	// 	fixed: true,
	// 	fractionDigits: 2,
	// 	negativeSignAfter: false,
	// 	prefix: 'R$',
	// 	suffix: '',
	// 	thousandsSeparator: '.'
	// }
	// mask.setMask('#myInput', options)
}

watch(
	() => props.modelValue,
	(newVal: any) => {
		if (!focused.value) {
			setValue(newVal)
		}
	},
	{ immediate: true }
)

onMounted(init)
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
		:size="size"
		:invalidFeedback="invalidFeedback">
		<input
			ref="inputRef"
			class="form-control"
			:placeholder="placeholder"
			@focus="focused = true"
			@blur="focused = false" />
	</FormWrapper>
</template>
