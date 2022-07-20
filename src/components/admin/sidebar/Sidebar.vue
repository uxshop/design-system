<script setup lang="ts">
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import type { SidebarInterface } from './SidebarInterface'
import Icon from '../../ui/icon/Icon.vue'
import { map, find } from 'lodash-es'
import { computed } from '@vue/reactivity'

export interface PermissionInterface {
	has(rule: string): boolean
}

export interface MenuProviderInterface {
	toggle(): void
}

export interface Props {
	permissionService: PermissionInterface
	menuOpen?: boolean
	menus: any
	currentSection?: string | null
}

const menu = inject('menu') as MenuProviderInterface
const props = defineProps<Props>()
const route = useRoute()

const menusFilter = computed(() => {
	const routeName = route.name.replace(/_[^_]+?$/, '')
	console.log(routeName)

	return map(props.menus, (item: SidebarInterface.Item) => {
		let disabled = !props.permissionService.has(item.permissions)

		item.withNodeActive = false

		map(item.nodes, (i) => {
			const itemName = i.to.replace(/_[^_]+?$/, '')

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
				console.log(item)

				i.active = true
			}

			return i
		})

		item.disabled = disabled

		return item
	})
})

const clickOverlay = () => {
	if (menu) menu.toggle()
}

const checkSubActive = (item: any) => {
	const routeName = route.name.replace(/_[^_]+?$/, '')
	const itemName = item.to.replace(/_[^_]+?$/, '')

	return itemName == routeName
}
</script>

<template>
	<div class="ui-sidebar" id="ui-sidebar">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container">
				<div class="ui-sidebar-content">
					<div class="ui-sidebar-nav">
						<router-link class="ui-sidebar-logo" :to="{ name: 'home' }">
							<slot name="logo" />
						</router-link>
						<slot name="select-button" />
					</div>
					<div class="ui-sidebar-items">
						<ul class="ui-sidebar-list -primary">
							<li
								v-for="(item, key) in menusFilter"
								class="ui-sidebar-item"
								:key="key"
								:class="{
									'-disabled': item.disabled,
									'-spacer': item.spacer,
									'-spacer-last': item.last
								}">
								<router-link
									:to="{ name: item.to }"
									:class="{
										'-nodes': item.nodes?.length,
										'-node-active': item.withNodeActive
									}"
									class="ui-sidebar-link"
									activeClass="-active">
									<span class="ui-sidebar-link-icon">
										<Icon :name="item.icon" filled />
									</span>
									<span class="ui-sidebar-link-text">
										{{ item.name }}
									</span>
								</router-link>
								<ul v-if="item.nodes && item.dropdown !== false" class="ui-sidebar-sublist">
									<li v-for="node in item.nodes" class="ui-sidebar-item">
										<router-link
											:to="{ name: node.to }"
											class="ui-sidebar-link -sub"
											:class="{
												'-active': checkSubActive(node),
												'-disabled': node.disabled
											}">
											<span class="ui-sidebar-link-icon"></span>
											<span class="ui-sidebar-link-text">
												{{ node.name }}
											</span>
										</router-link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="ui-sidebar-overlay" @click="clickOverlay"></div>
	</div>
</template>

<style lang="scss">
@import './Sidebar.scss';
</style>
