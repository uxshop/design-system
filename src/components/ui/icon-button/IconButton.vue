<script setup lang="ts">
import { computed } from 'vue'
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
	type: 'outlined'
})

const computedButtonProps = computed(() => ({
	icon: props.icon,
	variant: props.variant,
	size: props.size,
	type: props.type,
	fab: props.fab,
  disabled: props.disabled
}))
</script>

<template>
	<Button
		class="ui-icon-button"
		:variant="computedButtonProps.variant"
		:class="{ '-fab': computedButtonProps.fab }"
    :disabled="computedButtonProps.disabled"
		:size="computedButtonProps.size">
		<Icon :name="computedButtonProps.icon" :type="computedButtonProps.type" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
