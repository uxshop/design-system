<script setup lang="ts">
withDefaults(
	defineProps<{
		href?: string
		to?: object
		label?: string
		target?: string
	}>(),
	{
		target: '_self'
	}
)
</script>

<template>
	<div class="ui-dropdown-item-wrapper">
		<a :href="href" :target="target" v-if="href" class="ui-dropdown-item">
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
