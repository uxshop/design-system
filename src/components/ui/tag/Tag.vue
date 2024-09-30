<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../icon/Icon.vue'
import type { Variant } from '../../../types/Types'

export interface TagProps {
	label?: string
	variant?: 'primary' | 'success' | 'danger' | 'default' | 'warning'
}

const props = withDefaults(defineProps<TagProps>(), {
	variant: 'default'
})

const emit = defineEmits(['remove'])

const onRemove = () => {
	emit('remove')
}

const tagClassList = computed(() => {
	let classes = []

	if (props.variant) {
		classes.push(`-variant-${props.variant}`)
	}

	return classes
})
</script>

<template>
	<span class="ui-tag" :class="tagClassList">
		<slot>{{ label }}</slot>
		<Icon name="close" class="ui-tag-close" @click="onRemove" />
	</span>
</template>

<style lang="scss">
@import './Tag.scss';
</style>
