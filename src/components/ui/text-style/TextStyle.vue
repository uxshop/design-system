Te
<script lang="ts" setup>
interface Props {
	tag?: string
	variant?: string
}

const props = withDefaults(defineProps<Props>(), {
	tag: 'span'
})

const classList: any[] = []

if (props.variant) {
	classList.push(`-${props.variant}`)
}
</script>

<template>
	<component :is="tag" class="ui-text-style" :class="classList">
		<slot />
	</component>
</template>

<style lang="scss">
@import './TextStyle.scss';
</style>
