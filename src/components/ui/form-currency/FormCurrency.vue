<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
const emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<Props>(), {
	state: undefined,
	placeholder: '0.00',
	max: 999999.99
})
const focused = ref(props.autofocus ?? false)

const classList = computed(() => [
	'form-control',
	props.state === true ? '-valid' : props.state === false ? '-invalid' : ''
])

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
const settings: CurrencyInputOptions = {
	...props.options,
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
			min: props.min,
			max: props.max
		}
	}
}

const { inputRef, setValue } = useCurrencyInput(settings)

watch(
	() => props.modelValue,
	(newVal: any) => {
		if (newVal === null) return
		setValue(parseFloat(newVal))
	},
	{ immediate: true }
)

watch(
	() => focused.value,
	(newVal: any) => {
		if (!newVal) return
		emit('change', newVal)
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
			:class="classList"
			:placeholder="float ? '' : placeholder"
			@focus="focused = true"
			@blur="focused = false"
			:disabled="disabled"
			:required="required"
			:readonly="readonly"
			:autocomplete="autocomplete" />
	</FormWrapper>
</template>
