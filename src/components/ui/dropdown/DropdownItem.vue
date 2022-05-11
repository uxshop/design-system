<script setup lang="ts">
defineProps<{
	href?: string
	to?: object
	label?: string
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<a :href="href" v-if="href" class="ui-dropdown-item">
			<slot>{{ label }}</slot>
		</a>
		<router-link :to="to" v-else-if="to" class="ui-dropdown-item">
			<slot>{{ label }}</slot>
		</router-link>
		<span v-else class="ui-dropdown-item">
			<slot>{{ label }}</slot>
		</span>
	</div>
</template>
