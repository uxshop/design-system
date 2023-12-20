<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { map } from 'lodash-es'
import type { SidebarInterface } from './SidebarInterface'
import Icon from '../../ui/icon/Icon.vue'
import type { SideBarItem } from './types'

export interface PermissionInterface {
	has(rule: string): boolean
}

export interface MenuProviderInterface {
	open: boolean
	removeSidebar(): void
	toggle(): void
}

export interface Props {
	isActive: (item: SideBarItem, isOnlyChildren?: boolean) => boolean
	menuOpen?: boolean
	menus: SideBarItem[]
	currentSection?: string | null
}

const menu = inject('menu') as MenuProviderInterface
const props = defineProps<Props>()

const emit = defineEmits<{
	(evt: 'onClickItem', type: 'logo' | 'node' | 'footer' | string, menuItem?: SideBarItem): void
}>()

const toggleMenu = (item: any) => {
	if (menu) {
		menu.toggle()
		emit('onClickItem', 'node', item)
	}
}
</script>

<template>
	<div class="ui-sidebar" id="ui-sidebar">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container">
				<div class="ui-sidebar-content">
					<div class="ui-sidebar-nav">
						<div class="ui-sidebar-logo" @click="emit('onClickItem', 'logo')">
							<slot name="logo" />
						</div>
						<slot name="select-button" />
					</div>
					<div class="ui-sidebar-list">
						<ul class="ui-sidebar-list -primary">
							<li
								v-for="(item, key) in menus"
								class="ui-sidebar-item"
								redirectLink
								:key="key"
								:class="[
									{
										'-disabled': item.disabled,
										'-spacer': item.spacer,
										'-spacer-last': item.last
									},
									item.to
								]">
								<small v-if="item.caption" class="ui-sidebar-link-caption">{{ item.caption }}</small>
								<div
									:class="{
										'-nodes': item.nodes?.length,
										'-node-active': isActive(item, true),
										'-active': isActive(item)
									}"
									class="ui-sidebar-link"
									activeClass="-active"
									@click="emit('onClickItem', 'node', item)">
									<span class="ui-sidebar-link-icon">
										<Icon :name="item.icon" filled />
									</span>
									<span class="ui-sidebar-link-text">
										{{ item.name }}
									</span>
								</div>

								<ul v-if="item.nodes && item.dropdown !== false" class="ui-sidebar-sublist">
									<li v-for="(node, index) in item.nodes" class="ui-sidebar-item" :key="index">
										<div
											class="ui-sidebar-link -sub"
											@click="toggleMenu(node)"
											:class="{
												'-active': isActive(node),
												'-disabled': node.disabled
											}">
											<span class="ui-sidebar-link-icon"></span>
											<span class="ui-sidebar-link-text"> {{ node.name }} </span>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<slot name="footer" @click="emit('onClickItem', 'footer')" />
				</div>
			</div>
		</div>
		<div class="ui-sidebar-overlay" @click="toggleMenu"></div>
		<div v-if="menu.open === true" class="ui-close-sidebar" @click="toggleMenu">
			<Icon name="close" />
		</div>
	</div>
</template>

<style lang="scss">
@import './Sidebar.scss';
</style>
