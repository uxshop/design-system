<script setup lang="ts">
const props = defineProps<{
	to?: any
}>()

const getComponent = () => {
	return !props.to ? 'div' : 'router-link'
}
</script>
<template>
	<component :is="getComponent()" class="ui-table-row" :to="to">
		<slot />
	</component>
</template>
