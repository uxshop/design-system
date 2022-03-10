<script setup lang="ts">
import { ref } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import Icon from '../icon/Icon.vue'

function createRipple(event) {
	const button = event.currentTarget
	const circle = document.createElement('span')
	const diameter = Math.max(button.clientWidth, button.clientHeight)
	const radius = diameter / 2
	circle.style.width = circle.style.height = `${diameter}px`
	circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
	circle.style.top = `${event.clientY - button.offsetTop - radius}px`
	circle.classList.add('ripple')
	const ripple = button.getElementsByClassName('ripple')[0]
	if (ripple) {
		ripple.remove()
	}
	button.appendChild(circle)
}

interface Props {
	variant?: string
	label?: string
	leadingIcon?: string
	trailingIcon?: string
	size?: string | number
	href?: string
	flush?: string
	block?: boolean
	to?: object
	spinnerBorder?: number | string
	type?: string
	loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	spinnerBorder: 2,
	type: 'button'
})

const classList = ref<string[]>([])

const component = ref('button')

if (props.to) {
	component.value = 'router-link'
}

if (props.href) {
	component.value = 'a'
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}

if (props.leadingIcon) {
	classList.value.push(`-icon`)
}

if (props.flush) {
	classList.value.push(`-flush-${props.flush}`)
}

if (props.block) {
	classList.value.push(`-block`)
}
</script>

<template>
	<component
		class="ui-button"
		:is="component"
		:type="type"
		:class="[classList, { '-loading': loading }]"
		:disabled="loading"
		:to="to"
		:href="href"
	>
		<div class="ui-button-content">
			<icon :name="leadingIcon" v-if="leadingIcon" />
			<spinner v-if="loading" :size="15" :border="spinnerBorder" />
			<div>
				<slot />
				{{ label }}
			</div>
			<icon :name="trailingIcon" v-if="trailingIcon" />
		</div>
	</component>
</template>

<style lang="scss">
@import './Button.scss';
</style>
