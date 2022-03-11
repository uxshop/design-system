<script setup lang="ts">
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'

interface Props {
	icon: string
	variant?: string
	size?: string | number
	type?: 'filled' | 'rounded' | 'outlined' | 'twotone'
	fab?: boolean
}

defineProps<Props>()
</script>

<template>
	<Button class="ui-icon-button" :variant="variant" :class="{ '-fab': fab }" :size="size">
		<Icon :name="icon" :type="type" class="icon" />
	</Button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
