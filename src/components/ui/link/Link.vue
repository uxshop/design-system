<script lang="ts" setup>
interface Props {
	to?: string | object
	href?: string
	text?: string | null
}
withDefaults(defineProps<Props>(), { href: 'javascript:;' })
</script>

<template>
	<router-link class="ui-link" v-if="to" :to="to"> 
		<slot>{{ text }}</slot>
	</router-link>
	<a :href="href" v-else class="ui-link">
		<slot>{{ text }}</slot>
	</a>
</template>
