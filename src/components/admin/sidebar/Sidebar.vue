<script setup lang="ts">
import SidebarSubmenu from './SidebarSubmenu.vue'
import { inject, onMounted, ref, shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Logo from '../logo/Logo.vue'
import IconButton from '../../ui/icon-button/IconButton.vue'
import MobileDetector from '../../../services/MobileDetectorService'
import type { SidebarInterface } from './SidebarInterface'
import { each, find } from 'lodash'

interface PermissionInterface {
	has(rule: string): boolean
}

interface MenuProviderInterface {
	toggle(): void
}

interface Props {
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

// onMounted(() => {
// 	section.value = String(route.meta.section)
// 	if (props.menus) {
// 		currentMenu.value = props.menus[section.value]
// 		if (currentMenu.value && currentMenu.value.nodes) {
// 			activeSection.value = section.value
// 		} else {
// 			activeSection.value = null
// 		}

// 		console.log(activeSection.value, currentMenu.value, section.value, props.menus)
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

const toggleDarkmode = () => {
	if (localStorage.getItem('darkmode') == '1') {
		localStorage.setItem('darkmode', '0')
		document.documentElement.removeAttribute('data-theme')
	} else {
		localStorage.setItem('darkmode', '1')
		document.documentElement.setAttribute('data-theme', 'dark')
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
	activeSection.value = props.currentSection
})
</script>

<template>
	<div class="ui-sidebar" :class="{ '-open': menuOpen }">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container" :class="{ '-submenu-open': activeSection }">
				<div class="ui-sidebar-content" :class="{ '-hide': activeSection }">
					<div class="ui-sidebar-nav">
						<router-link class="ui-sidebar-logo" :to="{ name: 'home' }">
							<Logo class="logo logo-small" />
						</router-link>
						<slot name="select-button" />
						<IconButton icon="brightness_7" class="btn-darkmode" type="rounded" @click="toggleDarkmode" />
						<IconButton icon="brightness_4" class="btn-darkmode" @click="toggleDarkmode" />
					</div>
					<div class="ui-sidebar-items">
						<ul class="ui-sidebar-list -primary">
							<li
								v-for="(item, key) in menus"
								class="item"
								:key="key"
								:class="{
									'-disabled': !hasPermission(item),
									'-spacer': item.spacer,
									'-spacer-last': item.last
								}">
								<div
									@click="onClickLink(key, item)"
									:class="{
										'-active': key == currentSection,
										'-disabled': item.disabled
									}"
									class="link">
									<div class="link-text">
										<span>{{ item.name }}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<SidebarSubmenu
					:menus="menus"
					:has-permission="hasPermission"
					:click-link="onClickLink"
					:active-section="activeSection"
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
