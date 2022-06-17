<script setup lang="ts">
import { inject, ref, watchPostEffect } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import type { SidebarInterface } from './SidebarInterface'
import Icon from '../../ui/icon/Icon.vue'
import { map } from 'lodash-es'

export interface PermissionInterface {
	has(rule: string): boolean
}

export interface MenuProviderInterface {
	toggle(): void
}

export interface Props {
	permissionService: PermissionInterface
	menuOpen?: boolean
	menus: Record<string, SidebarInterface.Item>
	currentSection?: string | null
}

const menu = inject('menu') as MenuProviderInterface
const props = defineProps<Props>()
const route = useRoute()
// const activeSection = ref<string | null | undefined>()
// const menusFormated: any = {}
// map(props.menus, (item, key) => {
// 	if (item.nodes) {
// 		const alias = item.to?.replace(/_.*/g, '') as string

// 		menusFormated[alias] = {
// 			to: item.to,
// 			parent: key
// 		}

// 		map(item.nodes, (i) => {
// 			const alias = i.to?.replace(/_.*/g, '') as string

// 			menusFormated[alias] = {
// 				alias: alias,
// 				to: i.to,
// 				parent: key
// 			}
// 		})
// 	}
// })

const hasPermission = (item: SidebarInterface.Item) => {
	if (props.permissionService.has(item.permissions)) {
		return true
	}

	let ability = false

	if (item.nodes && item.nodes.length) {
		item.nodes.forEach((i: SidebarInterface.Item) => {
			if (props.permissionService.has(i.permissions)) {
				ability = true
			}
		})
	} else {
		ability = props.permissionService.has(item.permissions)
	}

	return ability
}

const clickOverlay = () => {
	if (menu) {
		menu.toggle()
	}
}

const checkActive = (name: any) => {
	const el = document.getElementById('ui-sidebar')?.getElementsByClassName('-active') as HTMLCollectionOf<HTMLElement>
	const link = el[0]?.parentElement?.parentElement?.previousElementSibling
	const linkOpened = document.getElementById('ui-sidebar')?.getElementsByClassName('-open')
	linkOpened && linkOpened[0]?.classList.remove('-open')
	link?.classList.add('-open')
}

watchPostEffect(() => checkActive(route.name))

// watchPostEffect(() => {
// const alias = route.name.replace(/_.*/g, '')
// console.log(route)
// console.log(alias, menusFormated)
// activeSection.value = menusFormated[alias]?.parent
// activeSection.value = menusFormated[route.name]?.parent
// })
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
								v-for="(item, key) in menus"
								class="ui-sidebar-item"
								:key="key"
								:class="{
									'-disabled': !hasPermission(item),
									'-spacer': item.spacer,
									'-spacer-last': item.last
								}">
								<router-link
									:to="{ name: item.to }"
									:class="{
										'-nodes': item.nodes,
										// '-open': key == activeSection,
										'-child-active': item.nodes && item.to == item.nodes[0].to
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
								<ul v-if="item.nodes" class="ui-sidebar-sublist">
									<li v-for="node in item.nodes" class="ui-sidebar-item">
										<router-link :to="{ name: node.to }" class="ui-sidebar-link -sub" activeClass="-active">
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
