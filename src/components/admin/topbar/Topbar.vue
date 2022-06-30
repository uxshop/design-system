<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import Breadcrumb from '../../ui/breadcrumb/UiBreadcrumb.vue'
import BreadcrumbItem from '../../ui/breadcrumb/BreadcrumbItem.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import Icon from '../../ui/icon/Icon.vue'
import { initials as filterInitials } from '../../../filters'
import DropdownDividerVue from '../../ui/dropdown/DropdownDivider.vue'
import DropdownItemButtonVue from '../../ui/dropdown/DropdownItemButton.vue'
import DropdownItemVue from '../../ui/dropdown/DropdownItem.vue'
import IconButton from '../../ui/icon-button/IconButton.vue'
import ButtonDarkmode from '../../admin/button-darkmode/ButtonDarkmode.vue'

export interface Props {
	user: any
	slug?: string
	backlink?: any | null
	breadcrumb?: { to: string; name: string }[]
	notifications?: any
	dropdown?: any[]
}

interface IDropdownItem {
	text?: string
	action?: () => void
	icon?: string
	to?: string
	href?: string
	target?: string
}

const props = withDefaults(defineProps<Props>(), {
	dropdown: () => []
})

const emit = defineEmits(['toggleMenu', 'toggleNotification'])
const menu = inject<{ toggle(): void }>('menu')

const initials = computed(() => {
	return filterInitials(props.user.name)
})

const onToggleMenu = () => {
	emit('toggleMenu')

	if (menu) menu.toggle()
}

const onNotification = () => {
	emit('toggleNotification')
}

const getComponent = (item: IDropdownItem) => {
	if (!item.text) {
		return DropdownDividerVue
	}

	if (item.to) {
		return DropdownItemVue
	}

	if (item.href) {
		return DropdownItemVue
	}

	return DropdownItemButtonVue
}
</script>

<template>
	<div class="ui-topbar" id="ui-topbar">
		<div class="ui-topbar-wrapper">
			<div class="ui-topbar-content">
				<div class="ui-topbar-mobile">
					<button class="ui-topbar-menu" @click="onToggleMenu">
						<Icon name="menu" />
					</button>
					<slot name="logo-mobile" />
				</div>
				<Breadcrumb>
					<BreadcrumbItem :to="{ name: backlink.to }" class="btn-back" v-if="backlink">
						<Icon name="arrow_back" />
						<span>voltar</span>
					</BreadcrumbItem>
					<BreadcrumbItem :to="{ name: 'home' }">
						<span>Início</span>
					</BreadcrumbItem>
					<BreadcrumbItem v-for="item in breadcrumb" :to="{ name: item.to }" :key="item.name">
						<span>{{ item.name }}</span>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			<div class="ui-topbar-actions">
				<div class="ui-topbar-actions">
					<IconButton
						icon="notifications"
						variant="plain"
						@click="onNotification"
						class="ui-topbar-notification-button"
						:class="{ '-new': notifications }" />

					<ButtonDarkmode />
				</div>
			</div>

			<div class="ui-topbar-user">
				<div class="ui-topbar-btn">
					<Dropdown right closeOn>
						<template #button-content>
							<div class="ui-topbar-btn-wrapper">
								<div class="ui-topbar-btn-avatar">
									<img :src="user.image.src" v-if="user.image" />
									<span v-else>
										{{ initials }}
									</span>
								</div>
								<div class="ui-topbar-btn-info" v-if="user.name">
									<span class="name">{{ user.name }}</span>
									<span v-if="slug" class="slug">{{ slug }}</span>
								</div>
							</div>
						</template>
						<slot name="user-links" />
						<component
							:is="getComponent(item)"
							v-for="item in dropdown"
							:key="item"
							:target="item.target"
							@click="item.onAction"
							v-bind="item">
							<Icon :name="item.icon" v-if="item.icon" />
							<span>{{ item.text }}</span>
						</component>
					</Dropdown>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './topbar.scss';
</style>
