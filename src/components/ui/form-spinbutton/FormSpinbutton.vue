<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Spinner from '../spinner/Spinner.vue'

export interface Props {
	modelValue: number
	min?: string | number
	max?: string | number
	placeholder?: string
	size?: string | number
	step?: string | number
	loading?: boolean
	disabled?: boolean
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
	if (props.max === undefined || props.modelValue < props.max) {
		update(props.modelValue + Number(props.step))
	}
}

const decrease = () => {
	if (props.min === undefined || props.modelValue > props.min) {
		update(props.modelValue - Number(props.step))
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

watchEffect(() => {
	disabledIncrement.value = false
	disabledDecrement.value = false

	if (props.max && props.modelValue >= props.max) {
		disabledIncrement.value = true
	}
	if (props.max && props.modelValue <= props.min) {
		disabledDecrement.value = true
	}
})
</script>

<template>
	<div role="group" tabindex="-1" class="ui-form-spinbutton" :class="classList">
		<div class="ui-form-spinbutton-loader" v-if="loading">
			<Spinner class="ui-form-spinbutton-loader-spin" size="18" />
		</div>
		<button
			:disabled="disabled || disabledDecrement"
			tabindex="-1"
			type="button"
			aria-controls="demo-sb"
			aria-label="Decrement"
			aria-keyshortcuts="ArrowDown"
			class="ui-button"
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
		</button>
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
			<bdi v-if="modelValue !== undefined">
				{{ modelValue }}
			</bdi>
			<bdi v-else>
				{{ placeholder }}
			</bdi>
		</div>
		<button
			tabindex="-1"
			:disabled="disabled || disabledIncrement"
			type="button"
			aria-controls="demo-sb"
			aria-label="Increment"
			aria-keyshortcuts="ArrowUp"
			class="ui-button"
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
		</button>
	</div>
</template>

<style lang="scss">
@import './FormSpinbutton.scss';
</style>
