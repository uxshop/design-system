<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
import Link from '../../ui/link/Link.vue'

defineProps<{
	name: string
	href: string
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
				<Link :href="href" target="_blank">
					<span>{{ name }}</span>
					<Icon name="open_in_new" />
				</Link>
			</span>
			na base de conhecimento.
		</span>
	</div>
</template>

<style lang="scss">
.page-message-support {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: auto;
	padding-top: 40px;
	gap: 10px;

	.icon {
		font-size: 18px;
	}

	.page-message-support-link {
		a {
			text-decoration: none;
			display: inline-flex;
			gap: 2px;
			text-transform: lowercase;

			&:hover > span {
				text-decoration: underline;
			}
		}

		.ui-icon {
			font-size: 12px;
			position: relative;
			top: 4px;
		}
	}
}
</style>
