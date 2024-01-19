<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import type { Size, Variant } from '../../../types'

export interface Props {
	icon?: string
	variant?: Variant
	size?: Size
	fab?: boolean
	disabled?: boolean
	onColor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md'
})

const iconSize = computed(() => {
	switch (props.size) {
		case 'sm':
			return 16
		case 'md':
			return 24
		case 'lg':
			return 32
	}
})
</script>

<template>
	<Button
		class="ui-icon-button"
		:class="{ '-fab': fab, '-on-color': onColor }"
		:variant="variant"
		:size="size"
		:disabled="disabled">
		<Icon :name="icon" :size="iconSize" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
