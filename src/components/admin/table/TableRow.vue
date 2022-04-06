<script setup lang="ts">
import Link from '../../ui/link/Link.vue'
const props = defineProps<{
	to?: any
}>()

const getComponent = () => {
	return !props.to ? 'div' : Link
}
</script>
<template>
	<component :is="getComponent()" class="ui-table-row" :to="to">
		<slot />
	</component>
</template>
