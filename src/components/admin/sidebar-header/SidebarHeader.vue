<script setup lang="ts">
import IconButton from '../../../components/ui/icon-button/IconButton.vue'

interface SidebarHeaderProps {
	height?: string
	logoImage?: string
	logoSvg?: string
}

withDefaults(defineProps<SidebarHeaderProps>(), {
	height: '40px'
})

const emits = defineEmits(['quickSearch:submit', 'quickSearch:click', 'quickSearch:option'])
</script>
<template>
	<div class="sidebar-header-logo-container">
		<div class="logo" scoped>
			<div v-if="logoSvg" v-html="logoSvg" class="boxSvg" />
			<img v-if="logoImage" :src="logoImage" />
		</div>
		<div class="sidebar-header-logo-container-icons">
			<IconButton @click="emits('quickSearch:click', true)" icon="search" variant="plain" />
			<IconButton icon="notifications" variant="plain" custom-class="ui-topbar-notification-button" />
		</div>
	</div>
</template>

<style lang="scss">
.sidebar-header-logo-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.logo {
		height: v-bind(height);

		img {
			height: 100%;
			display: block;
		}

		[data-theme='dark'] & {
			filter: brightness(0) invert(1);
			opacity: 0.88;
		}
	}

	&-icons {
		display: flex;
		align-items: center;
		gap: var(--s-spacing-nano);

		.ui-button {
			> .announcekit-widget-badge {
				position: absolute !important;
				left: var(--s-spacing-small);
				bottom: var(--s-spacing-x-small);
			}
		}
	}
}
</style>
