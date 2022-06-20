<script setup lang="ts">
const props = defineProps<{
	to?: any
	head?: boolean
}>()

const getComponent = () => {
	return !props.to ? 'div' : 'router-link'
}
</script>
<template>
	<component :is="getComponent()" class="ui-table-row" :to="to" :class="{'-head': head}">
		<slot />
	</component>
</template>
