<script setup lang="ts">
const props = defineProps<{
	to: object
}>()
</script>

<template>
	<div class="ui-breadcrumb-item">
		<router-link :to="to" v-if="to">
			<slot />
		</router-link>
		<div v-else>
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
@import './BreadCrumbItem.scss';
</style>
