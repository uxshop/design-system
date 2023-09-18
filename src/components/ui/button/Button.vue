<script setup lang="ts">
import { ref, watch } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import Icon from '../icon/Icon.vue'

export interface Props {
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'link' | 'dark' | 'plain'
	label?: string
	leadingIcon?: string
	trailingIcon?: string
	size?: string | number
	href?: string
	flush?: 'left' | 'right'
	block?: boolean
	to?: object
	spinnerBorder?: number | string
	type?: string
	loading?: boolean
	outline?: boolean
	disclosure?: boolean
	target?: '_blank' | '_self'
}

const props = withDefaults(defineProps<Props>(), {
	spinnerBorder: 2,
	type: 'button'
})

let componentButton = 'BUTTON'
const classList = ref<string[]>([])
const trailingIcon = ref(props.trailingIcon)

if (props.to) {
	componentButton = 'router-link'
}

if (props.href) {
	componentButton = 'a'
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
} else {
	classList.value.push(`-default`)
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

if (props.outline) {
	classList.value.push(`-outline`)
}

if (props.disclosure) {
	trailingIcon.value = 'arrow_drop_down'
	classList.value.push('-disclousure')
}

watch(
	() => props.variant,
	(newVal) => {
		classList.value.push(`-${newVal}`)
	}
)
</script>

<template>
	<component
		class="ui-button"
		:is="componentButton"
		:type="type"
		:class="[classList, { '-loading': loading }]"
		:disabled="loading"
		:to="to"
		:href="href"
		:target="target">
		<div class="ui-button-content">
			<Icon :name="leadingIcon" v-if="leadingIcon" />
			<Spinner v-if="loading" :size="15" :border="spinnerBorder" />
			<div>
				<slot>{{ label }}</slot>
			</div>
			<Icon :name="trailingIcon" v-if="trailingIcon" />
		</div>
	</component>
</template>

<style lang="scss">
@import './Button.scss';
</style>
