<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		tag?: string
		label?: string
		variant?: 'muted' | 'primary' | 'danger' | 'success' | 'secondary'
		block?: boolean
	}>(),
	{
		tag: 'span'
	}
)

const classList: string[] = []

if (props.variant) {
	classList.push(`-${props.variant}`)
}

if (props.block) {
	classList.push(`-block`)
}
</script>

<template>
	<component :is="tag" class="ui-text-style" :class="classList">
		<slot>{{ label }}</slot>
	</component>
</template>

<style lang="scss">
@import './TextStyle.scss';
</style>
