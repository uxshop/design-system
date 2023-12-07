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
	permissionService: PermissionInterface
	menuOpen?: boolean
	menus: Record<string, SideBarItem>
	currentSection?: string | null
}

const menu = inject('menu') as MenuProviderInterface
const props = defineProps<Props>()
const route = useRoute()
const menusFilter = ref<any>([])

const emit = defineEmits<{
	(evt: 'onClickLogo'): void
	(evt: 'onClickNode', menuItem: SideBarItem, isSubMenu: boolean): void
}>()

watchEffect(() => {
	const routeName = String(route.name).replace(/_[^_]+?$/, '')

	menusFilter.value = map(props.menus, (item: SidebarInterface.Item) => {
		let disabled = !props.permissionService.has(item.permissions)

		item.withNodeActive = false

		map(item.nodes, (i) => {
			const itemName = i.to?.replace(/_[^_]+?$/, '')

			item.rawTo = item.to
			i.disabled = true
			item.active = false

			if (props.permissionService.has(i.permissions)) {
				if (disabled === true) item.to = i.to
				disabled = i.disabled = false
			}

			if (itemName == routeName) {
				item.active = true
				item.withNodeActive = true
				i.active = true
			}

			return i
		})

		item.disabled = disabled

		return item
	})
})

const toggleMenu = (item: any) => {
  console.log('fwfawfae')
	if (menu) {
		// menu.toggle()
		// emit('onClickNode', item, true)
	}
}

const checkSubActive = (item: any) => {
	if (route.name) {
		const routeName = String(route.name).replace(/_[^_]+?$/, '')
		const itemName = item.to.replace(/_[^_]+?$/, '')

		return itemName == routeName
	}

	return false
}
</script>

<template>
	<div class="ui-sidebar" id="ui-sidebar">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container">
				<div class="ui-sidebar-content">
					<div class="ui-sidebar-nav">
						<div class="ui-sidebar-logo" @click="emit('onClickLogo')">
							<slot name="logo" />
						</div>
						<slot name="select-button" />
					</div>
					<div class="ui-sidebar-list">
						<ul class="ui-sidebar-list -primary">
							<li
								v-for="(item, key) in menusFilter"
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
										'-node-active': item.withNodeActive
									}"
									class="ui-sidebar-link"
									activeClass="-active"
									@click="emit('onClickNode', item.to, !!item.nodes?.length)">
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
												'-active': checkSubActive(node),
												'-disabled': node.disabled
											}">
											<span class="ui-sidebar-link-icon"></span>
											<span class="ui-sidebar-link-text">
												{{ node.name }}
											</span>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<slot name="footer" />
				</div>
			</div>
		</div>
		<!-- <div class="ui-sidebar-overlay" @click="toggleMenu"></div> -->
		<div v-if="menu.open === true" class="ui-close-sidebar" @click="toggleMenu">
			<Icon name="close" />
		</div>
	</div>
</template>

<style lang="scss">
@import './Sidebar.scss';
</style>
