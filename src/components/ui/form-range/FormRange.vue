<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

const props = defineProps<{
	modelValue?: undefined
	label?: string
	required?: boolean
	name?: string
	min?: string | number
	max?: string | number
	step?: string | number
}>()

const uid = `ui-form-range-${getCurrentInstance()?.uid}`
const slider = computed(() => {
	return props.modelValue
})
const showBubble = ref(false)

const emit = defineEmits(['update:modelValue'])

const update = (value: string) => {
	emit('update:modelValue', value)
}

const onChange = (evt: Event) => {
	const target = evt.target as HTMLInputElement
	update(target.value)
	showBubble.value = false
}

function setBubble(range: HTMLInputElement, bubble: HTMLElement): void {
	const val = range.value
	const min = range.min ? range.min : 0
	const max = range.max ? range.max : 100
	const newVal = ((Number(val) - Number(min)) * 100) / (Number(max) - Number(min))
	bubble.innerHTML = val
	bubble.style.left = `calc(${newVal}%)`
}

onMounted(() => {
	const allRanges = document.querySelectorAll('.ui-slider')
	allRanges.forEach((wrap) => {
		const range: HTMLInputElement | null = wrap.querySelector('.ui-slider-range')
		const bubble: HTMLElement | null = wrap.querySelector('.ui-slider-bubble')

		if (range && bubble) {
			range.addEventListener('input', () => {
				setBubble(range, bubble)
			})

			setBubble(range, bubble)
		}
	})
})
</script>

<template>
	<label class="ui-slider">
		<input
			type="range"
			:min="min"
			:max="max"
			:value="slider"
			:step="step"
			:id="uid"
			:name="name"
			class="ui-slider-range"
			@change="onChange"
			@mousedown="showBubble = true" />
		<output class="ui-slider-bubble" :class="{ '-active': showBubble }"></output>
	</label>
</template>

<style lang="scss">
@import './FormRange.scss';
</style>
