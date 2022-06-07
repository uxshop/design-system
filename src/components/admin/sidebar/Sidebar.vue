<script setup lang="ts">
import { inject, ref, shallowRef, watchPostEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MobileDetector from '../../../services/MobileDetector'
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

const props = withDefaults(defineProps<Props>(), {})
const currentMenu = shallowRef()
const section = shallowRef<string>()
const activeSection = ref<string | null | undefined>()
const router = useRouter()
const route = useRoute()
const menu = inject('menu') as MenuProviderInterface
const menusAll = {}

map(props.menus, (item) => {
	if (item.nodes) {
		map(item.nodes, (i) => {
			menusAll[i.to] = item.to
		})
	}
})

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

const onClickLink = (sec: string, item: SidebarInterface.Item) => {
	if (props.menus) {
		currentMenu.value = props.menus[sec]
		section.value = sec
	}

	if (MobileDetector() && !item.nodes) {
		clickOverlay()
	}

	if (item.nodes) {
		activeSection.value = item.section
	} else {
		router.push({ name: item.to }).catch(() => {
			//
		})
	}
}

const onBack = () => (activeSection.value = null)

const getLinkName = (item: SidebarInterface.Item) => {
	const name = item.nodes ? item.nodes[0].to : item.to
	return name
}

const isOpen = (item) => {
	console.log(item)
}

watchPostEffect(() => {
	activeSection.value = route.meta.section || route.name
})
</script>

<template>
	<div class="ui-sidebar">
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
									:class="{ '-nodes': item.nodes, '-open': item.section == activeSection }"
									class="ui-sidebar-link"
									activeClass="-active">
									<div class="ui-sidebar-link-icon">
										<Icon :name="item.icon" filled />
									</div>
									<div class="ui-sidebar-link-text">
										<span>{{ item.name }}</span>
									</div>
								</router-link>
								<ul v-if="item.nodes" class="ui-sidebar-sublist">
									<li v-for="node in item.nodes" class="ui-sidebar-item">
										<router-link :to="{ name: node.to }" class="ui-sidebar-link -sub" activeClass="-active">
											<div class="ui-sidebar-link-icon"></div>
											<div class="ui-sidebar-link-text">
												{{ node.name }}
											</div>
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
