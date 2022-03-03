<script setup lang="ts">
import Icon from '../icon/Icon.vue'
// import UiButton from '../button/Button.vue'

interface Props {
	icon: string
	variant: string
	size: string
	type: string
	fab: boolean
}

const props = defineProps<Props>()
</script>

<template>
	<ui-button class="ui-icon-button" :variant="variant" :class="{ '-fab': fab }" :size="size">
		<icon :name="icon" :type="type" class="icon" />
	</ui-button>
</template>

<style lang="scss">
@import './IconButton.scss';
</style>
