<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import type { Size } from 'src/types'

export interface Props {
	icon?: string
	variant?: 'primary' | 'success' | 'danger' | 'link' | 'plain'
	size?: Size
	fab?: boolean
	disabled?: boolean
	onColor?: boolean
}

withDefaults(defineProps<Props>(), {
	size: 'md'
})
</script>

<template>
	<Button
		class="ui-icon-button"
		:class="{ '-fab': fab, '-on-color': onColor }"
		:variant="variant"
		:size="size"
		:disabled="disabled">
		<Icon :name="icon" :size="24" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
