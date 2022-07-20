<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'

export interface Props {
	icon?: string
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'link' | 'dark' | 'plain'
	size?: string | number
	type?: 'filled' | 'rounded' | 'outlined' | 'twotone'
	fab?: boolean
}

defineProps<Props>()
</script>

<template>
	<Button class="ui-icon-button" :variant="variant" :class="{ '-fab': fab }" :size="size">
		<Icon :name="icon" :type="type" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
