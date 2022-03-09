<script setup lang="ts">
defineProps<{
	href: string
	to: object
}>()
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<a :href="href" v-if="href" class="ui-dropdown-item">
			<slot />
		</a>
		<router-link :to="to" v-else-if="to" class="ui-dropdown-item">
			<slot />
		</router-link>
		<span v-else class="ui-dropdown-item">
			<slot />
		</span>
	</div>
</template>
