<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCurrencyInput, type CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import type { Size } from '../../../types'

export interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	state?: boolean
	invalidFeedback?: string
	loading?: boolean
	last?: boolean
	float?: boolean
	modelValue?: string | number | null
	label?: string
	placeholder?: any
	size?: Size
	id?: string
	autocomplete?: string
	min?: string | number
	max?: string | number
	step?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	options?: Record<string, unknown>
}
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	placeholder: '0.00'
})
const classList = ref<string[]>([])
const focused = ref(props.autofocus ?? false)

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
const settings: CurrencyInputOptions = {
	...{
		locale: 'pt-BR',
		currency: 'BRL',
		currencyDisplay: CurrencyDisplay.symbol,
		hideCurrencySymbolOnFocus: false,
		hideGroupingSeparatorOnFocus: false,
		hideNegligibleDecimalDigitsOnFocus: false,
		autoDecimalDigits: true,
		autoSign: true,
		useGrouping: true,
		accountingSign: false,
		valueRange: {
			min: Number(props.min) ?? null,
			max: Number(props.max) ?? 999999.99
		}
	},
	...props.options
}

const { inputRef, setValue } = useCurrencyInput(settings)

watch(
	() => props.modelValue,
	(newVal: any) => {
		if (newVal) setValue(parseFloat(newVal))
		else setValue(null)
	},
	{ immediate: true }
)
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
		:labelInfo="labelInfo"
		:float="float"
		:state="state"
		:size="size"
		:invalidFeedback="invalidFeedback">
		<input
			:min="min"
			:step="step"
			ref="inputRef"
			class="form-control"
			:placeholder="float ? '' : placeholder"
			@focus="focused = true"
			@blur="focused = false"
			:disabled="disabled"
			:required="required"
			:readonly="readonly"
			:autocomplete="autocomplete" />
	</FormWrapper>
</template>
