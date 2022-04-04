<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Props {
	border?: string | number
	size?: string | number
	color?: string
	variant?: string
}

interface Style {
	width?: string
	height?: string
	color?: string
	borderWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
	border: 3,
	size: 22
})

const style = reactive<Style>({})
const classList = ref<string[]>([])

if (props.size) {
	style.width = `${props.size}px`
	style.height = `${props.size}px`
}

if (props.color) {
	style.color = `${props.color}`
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}

style.borderWidth = `${props.border}px`
</script>

<template>
	<div class="ui-spinner" :style="style" :class="classList" />
</template>

<style lang="scss">
.ui-spinner {
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: text-bottom;
	color: v-bind('style.color');
	border: v-bind('style.borderWidth') solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	-webkit-animation: spinnerBorderer 0.75s linear infinite;
	animation: spinnerBorderer 0.75s linear infinite;

	&.-primary {
		color: var(--primary);
	}

	&.-danger {
		color: var(--danger);
	}

	&.-success {
		color: var(--success);
	}
}
@keyframes spinnerBorderer {
	to {
		transform: rotate(360deg);
	}
}
</style>
