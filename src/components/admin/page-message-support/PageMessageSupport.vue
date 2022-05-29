<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
import Link from '../../ui/link/Link.vue'

defineProps<{
	name: string
	link: string
}>()
</script>

<template>
	<div class="page-message-support">
		<Icon class="icon" name="info" />
		<span class="page-message-support-text">
			Saiba mais sobre
			<!-- <base-external-link
				:href="this.$route.meta.support"
				style="text-transform: lowercase"
				class="page-message-support-link">
				{{ this.$route.meta.title || title }}
			</base-external-link> -->
			<span class="page-message-support-link">
				<Link :href="link" target="_blank">
					<span>{{ name }}</span>
					<Icon name="open_in_new" />
				</Link>
			</span>
			na base de conhecimento.
		</span>
	</div>
</template>

<style lang="scss">
@import './PageMessageSupport.scss';
</style>
