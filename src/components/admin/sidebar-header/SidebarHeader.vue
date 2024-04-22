<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '../../../components/ui/icon-button/IconButton.vue'

interface SidebarHeaderProps {
	height?: string
	logoImage?: string
	logoSvg?: string
	actionsConfig: {
		notification: { show: boolean; nameClass: string }
		quickSearch: { show: boolean }
	}
}

const props = withDefaults(defineProps<SidebarHeaderProps>(), {
	height: '40px'
})

const emits = defineEmits(['onQuickSearchClick', 'onLogoClick'])

const notificationConfig = ref(props.actionsConfig.notification)
const quickSearchConfig = ref(props.actionsConfig.quickSearch)
</script>
<template>
	<div class="sidebar-header-container">
		<div class="logo" @click="emits('onLogoClick')">
			<div v-if="logoSvg" v-html="logoSvg" class="boxSvg" />
			<img v-if="logoImage" :src="logoImage" />
		</div>
		<div class="sidebar-header-container-icons">
			<IconButton v-if="quickSearchConfig.show" @click="emits('onQuickSearchClick')" icon="search" variant="plain" />
			<IconButton
				v-if="notificationConfig.show"
				icon="notifications"
				variant="plain"
				:custom-class="notificationConfig.nameClass" />
		</div>
	</div>
</template>

<style lang="scss">
.sidebar-header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.logo {
		height: v-bind(height);
		cursor: pointer;

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
