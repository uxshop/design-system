<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'
import type { SidebarInterface } from './SidebarInterface'

defineProps<{
	menus: Record<string, SidebarInterface.Item>
	activeSection?: string | null
	hasPermission(a: SidebarInterface.Item): boolean
	clickLink(section: string, node: SidebarInterface.Item): void
}>()

const emit = defineEmits(['back'])
const onBack = () => emit('back')
</script>

<template>
	<div>
		<div
			v-for="(s, key) in menus"
			v-show="s.nodes"
			:class="{ '-active': s.section == activeSection }"
			:key="key"
			class="ui-sidebar-sub">
			<div class="ui-sidebar-sub-content">
				<span class="close" @click="onBack">
					<Icon name="arrow_back" />
					<span>menu</span>
				</span>
				<div class="title">{{ s.name }}</div>
				<ul class="sub-list">
					<li v-for="node in s.nodes" :key="node.to" class="item">
						<router-link
							@click.prevent="clickLink(key, node)"
							v-html="node.name"
							:to="{ name: node.to }"
							:disabled="!hasPermission(node)"
							class="link"
							tabindex="-1"
							event="" />
					</li>
				</ul>
				<div class="spacer" @click="onBack"></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './SidebarSubmenu.scss';
</style>
