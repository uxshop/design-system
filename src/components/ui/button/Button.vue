<script setup lang="ts">
import { ref } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import Icon from '../icon/Icon.vue'

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
	outline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	spinnerBorder: 2,
	type: 'button'
})

const classList = ref<string[]>([])

const componentButton = ref('button')

if (props.to) {
	componentButton.value = 'router-link'
}

if (props.href) {
	componentButton.value = 'a'
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
</script>

<template>
	<component
		class="ui-button"
		:is="componentButton"
		:type="type"
		:class="[classList, { '-loading': loading }]"
		:disabled="loading"
		:to="to"
		:href="href">
		<div class="ui-button-content">
			<Icon :name="leadingIcon" v-if="leadingIcon" />
			<Spinner v-if="loading" :size="15" :border="spinnerBorder" />
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
