<script setup lang="ts">
import './TextStyle.scss'

const props = withDefaults(
	defineProps<{
		tag?: string
		variant?: string
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
		<slot />
	</component>
</template>
