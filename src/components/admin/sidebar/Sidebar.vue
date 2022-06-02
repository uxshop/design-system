<script setup lang="ts">
import SidebarSubmenu from './SidebarSubmenu.vue'
import { inject, ref, shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MobileDetector from '../../../services/MobileDetector'
import type { SidebarInterface } from './SidebarInterface'
import Icon from '../../ui/icon/Icon.vue'

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
	clickLink?(): void
	currentSection?: string | null
}

const props = withDefaults(defineProps<Props>(), {
	clickLink: () => {
		return {}
	}
})

const currentMenu = shallowRef()
const section = shallowRef<string>()
const activeSection = ref<string | null | undefined>()
const router = useRouter()
const route = useRoute()
const menu = inject('menu') as MenuProviderInterface

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

watchEffect(() => {
	// if (props.currentSection !== undefined && activeSection.value !== props.currentSection) {
	activeSection.value = props.currentSection
	// }
})
</script>

<template>
	<div class="ui-sidebar" :class="{ '-open': menuOpen }">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container" :class="{ '-submenu-open': activeSection }">
				<div class="ui-sidebar-content" :class="{ '-hide': activeSection }">
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
								<div
									class="ui-sidebar-link"
									@click="onClickLink(key, item)"
									:class="{
										'-active': key == route.meta.section,
										'-disabled': item.disabled
									}">
									<Icon :name="item.icon" filled />
									<div class="ui-sidebar-link-text">
										<span>{{ item.name }}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<SidebarSubmenu
					:menus="menus"
					:hasPermission="hasPermission"
					:clickLink="onClickLink"
					:activeSection="activeSection"
					@back="onBack" />
			</div>
		</div>
		<div class="ui-sidebar-overlay" @click="clickOverlay"></div>
		<!-- <base-modal ref="modal" title="Selecione uma loja">
			<template v-slot="params">
				<TheStoreList :params="params" />
			</template>
		</base-modal> -->
	</div>
</template>

<style lang="scss">
@import './Sidebar.scss';
</style>
