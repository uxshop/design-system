<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import type { IconType, Size } from 'src/types'

export interface Props {
	icon?: string
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'link' | 'dark' | 'plain'
	size?: Size
	type: IconType
	fab?: boolean
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'outlined',
	size: 'md'
})
</script>

<template>
	<Button class="ui-icon-button" :variant="variant" :class="{ '-fab': fab }" :size="size" :disabled="disabled">
		<Icon :name="icon" :type="type" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
