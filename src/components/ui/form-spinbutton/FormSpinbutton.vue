<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

interface Props {
	min?: string | number
	max?: string | number
	placeholder?: string
	size?: string | number
	step?: string | number
	modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
	step: 1,
	modelValue: 1
})
const classList = ref<string[]>([])
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

if (props.size) {
	classList.value.push(`-${props.size}`)
}
</script>

<template>
	<div role="group" tabindex="-1" class="ui-form-spinbutton" :class="classList">
		<button
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
