<script setup lang="ts">
import { inject } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import NewsIndicator from '../../ui/news-indicator/NewsIndicator.vue'
import SidebarMobile from './SidebarMobile.vue'
import { isMobile } from '../../../helpers'
import type { SideBarItem, SideBarItemType, SidebarMobileMenu } from './types'

export interface MenuProviderInterface {
	open: boolean
	close(): void
	toggle(): void
}

export interface Props {
	isActive: (item: SideBarItem, isOnlyChildren?: boolean) => boolean
	menuOpen?: boolean
	menus: SideBarItem[]
	mobileNavigationBar: SidebarMobileMenu[]
}

const menu = inject('menu') as MenuProviderInterface
defineProps<Props>()

const emit = defineEmits<{
	(evt: 'onClickItem', type: SideBarItemType, menuItem?: SideBarItem | SidebarMobileMenu): void
}>()

const toggleMenu = (item: any) => {
	if (menu) {
		menu.toggle()
		emit('onClickItem', 'node', item)
	}
}

const handleMenuClick = (type: SideBarItemType, menuItem?: SideBarItem | SidebarMobileMenu): void => {
	emit('onClickItem', type, menuItem)
	if (isMobile) menu.close()
}

const handleMobileBar = (item: SidebarMobileMenu) => {
	if (item.type === 'action') {
		menu.toggle()
		return
	}

	emit('onClickItem', 'node', item)
	menu.close()
}
</script>

<template>
	<div class="ui-sidebar" id="ui-sidebar">
		<div class="ui-sidebar-wrapper">
			<div class="ui-sidebar-container">
				<div class="ui-sidebar-content">
					<div class="ui-sidebar-nav">
						<div class="ui-sidebar-logo" @click="handleMenuClick('logo')">
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
									class="ui-sidebar-link"
									:class="{
										'-node-active': item.active,
										'-active': item.active
									}"
									activeClass="-active"
									@click="handleMenuClick('node', item)">
									<div class="d-flex">
										<span class="ui-sidebar-link-icon">
											<Icon size="16" :name="item.icon" filled />
										</span>
										<span class="ui-sidebar-link-text -title">
											{{ item.name }}
										</span>
									</div>
									<div class="ui-sidebar-link-right-icons">
										<div class="news-indicator" v-if="item.isNew">
											<NewsIndicator />
										</div>
										<Icon v-if="item.nodes?.length" class="icon-arrow" name="expand_more" />
									</div>
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
											<span class="ui-sidebar-link-icon">
												<Icon size="16" name="subdirectory_arrow_right" />
											</span>
											<div class="ui-sidebar-link-content">
												<span class="ui-sidebar-link-text"> {{ node.name }} </span>
												<NewsIndicator v-if="node.isNew" label="Novo" />
											</div>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="ui-sidebar-footer" v-if="!isMobile">
						<slot name="footer" class="ui-sidebar-footer" @click="handleMenuClick('footer')" />
					</div>
				</div>
			</div>
		</div>
		<div class="ui-sidebar-overlay" @click="toggleMenu"></div>
	</div>

	<SidebarMobile :mobile-menus="mobileNavigationBar" @on-click-action="handleMobileBar" />
</template>

<style lang="scss">
@import './Sidebar.scss';
</style>
