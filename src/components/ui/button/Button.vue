<script setup lang="ts">
import { computed } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import Icon from '../icon/Icon.vue'
import type { Size } from 'src/types'

export interface Props {
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'link' | 'dark' | 'plain' | 'light'
	label?: string
	leadingIcon?: string
	trailingIcon?: string
	size?: Size
	href?: string
	flush?: 'left' | 'right'
	block?: boolean
	to?: object
	/** Use with loading true. */
	spinnerBorder?: number | string
	type?: string
	loading?: boolean
	outline?: boolean
	disclosure?: boolean
	target?: '_blank' | '_self'
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	spinnerBorder: 2,
	type: 'button'
})

const componentType = computed(() => {
	if (props.to) return 'router-link'
	if (props.href) return 'a'
	return 'BUTTON'
})

const classList = computed(() => {
	return [
		props.size && `-${props.size}`,
		props.variant ? `-${props.variant}` : '-default',
		props.leadingIcon && '-icon',
		props.flush && `-flush-${props.flush}`,
		props.block && '-block',
		props.outline && '-outline',
		props.disclosure && '-disclosure'
	].filter(Boolean)
})

const trailingIcon = computed(() => {
	if (props.disclosure) return 'arrow_drop_down'
	return props.trailingIcon
})
</script>

<template>
	<component
		class="ui-button"
		:is="componentType"
		:type="type"
		:class="[classList, { '-loading': loading, '-disabled': disabled }]"
		:disabled="disabled"
		:to="to"
		:href="href"
		:target="target">
		<div class="ui-button-content">
			<Icon :name="leadingIcon" v-if="leadingIcon" />
			<Spinner v-if="loading" :size="15" :border="spinnerBorder" />
			<div v-if="label || $slots.default" class="ui-button-label">
				<slot>{{ label }}</slot>
			</div>
			<Icon :name="trailingIcon" v-if="trailingIcon" />
		</div>
	</component>
</template>

<style lang="scss">
@import './Button.scss';
</style>
