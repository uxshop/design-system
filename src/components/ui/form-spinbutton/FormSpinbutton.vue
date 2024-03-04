<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import Button from '../button/Button.vue'
import type { Size } from 'src/types'

export interface Props {
	modelValue: number
	min?: string | number
	max?: string | number
	placeholder?: string
	size?: Size
	step?: string | number
	loading?: boolean
	disabled?: boolean
	inputable?: boolean
}

const emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<Props>(), {
	step: 1,
	modelValue: 1
})
const disabledDecrement = ref(false)
const disabledIncrement = ref(false)

const update = (val: number) => {
	emit('update:modelValue', val)
	emit('change', val)
}

const increase = () => {
	if (props.max === undefined || props.modelValue < Number(props.max)) {
		update(Number(props.modelValue) + Number(props.step))
	}
}

const decrease = () => {
	if (props.min === undefined || props.modelValue > Number(props.min)) {
		update(Number(props.modelValue) - Number(props.step))
	}
}

const classList = computed(() => {
	const data = []
	if (props.size) {
		data.push(`-${props.size}`)
	}

	if (props.disabled) {
		data.push(`-disabled`)
	}

	return data
})

const updateInput = (e: event) => {
	let val = e.target.value

	if (props.max && val > props.max) {
		val = props.max
	}

	if (props.min && val < props.min) {
		val = props.min
	}

	e.target.value = val

	if (val != props.modelValue) {
		update(Number(val))
	}
}

watchEffect(() => {
	disabledIncrement.value = false
	disabledDecrement.value = false

	if (props.max && props.modelValue >= Number(props.max)) {
		disabledIncrement.value = true
	}

	if (props.max && props.modelValue <= Number(props.min)) {
		disabledDecrement.value = true
	}
})
</script>

<template>
	<div role="group" tabindex="-1" class="ui-form-spinbutton" :class="classList">
		<div class="ui-form-spinbutton-loader" v-if="loading">
			<Spinner class="ui-form-spinbutton-loader-spin" size="18" />
		</div>
		<Button
			:disabled="disabled || disabledDecrement"
			tabindex="-1"
			type="button"
			aria-controls="demo-sb"
			aria-label="Decrement"
			aria-keyshortcuts="ArrowDown"
			:class="classList"
			class="ui-form-spinbutton-action"
			@click="decrease">
			<svg
				viewBox="0 0 16 16"
				width="1em"
				height="1em"
				focusable="false"
				role="img"
				aria-label="dash"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="icon">
				<g transform="translate(8 8) scale(1.25 1.25) translate(-8 -8)">
					<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
				</g>
			</svg>
		</Button>
		<div
			:disabled="disabled"
			class="output"
			dir="ltr"
			role="spinbutton"
			tabindex="0"
			aria-live="off"
			aria-valuemin="1"
			aria-valuemax="100"
			aria-valuenow="50"
			aria-valuetext="50">
			<input
				type="tel"
				:value="modelValue"
				:readonly="!inputable"
				@blur="updateInput"
				@focus="$event.target.select()"
				:placeholder="placeholder" />
		</div>
		<Button
			tabindex="-1"
			:disabled="disabled || disabledIncrement"
			type="button"
			aria-controls="demo-sb"
			aria-label="Increment"
			aria-keyshortcuts="ArrowUp"
			:class="classList"
			class="ui-form-spinbutton-action"
			@click="increase">
			<svg
				viewBox="0 0 16 16"
				width="1em"
				height="1em"
				focusable="false"
				role="img"
				aria-label="plus"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="icon">
				<g transform="translate(8 8) scale(1.25 1.25) translate(-8 -8)">
					<path
						d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
				</g>
			</svg>
		</Button>
	</div>
</template>

<style lang="scss">
@import './FormSpinbutton.scss';
</style>
