<script setup lang="ts">
import { computed, inject } from 'vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Breadcrumb from '../../ui/breadcrumb/UiBreadcrumb.vue'
import BreadcrumbItem from '../../ui/breadcrumb/BreadcrumbItem.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import Icon from '../../ui/icon/Icon.vue'
import { initials as filterInitials } from '../../../filters'

import DropdownDividerVue from '../../ui/dropdown/DropdownDivider.vue'
import DropdownItemButtonVue from '../../ui/dropdown/DropdownItemButton.vue'
import DropdownItemVue from '../../ui/dropdown/DropdownItem.vue'

interface Props {
	user: { name: string; image: any }
	slug?: string
	backlink?: { to: string }
	breadcrumb?: { to: string; name: string }[]
	notifications?: object
	dropdown?: any[]
}

interface IDropdownItem {
	text?: string
	action?: () => void
	icon?: string
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

	if (!item.action) {
		return DropdownItemButtonVue
	}

	return DropdownItemVue
}
</script>

<template>
	<div class="ui-userbar">
		<div class="ui-userbar-wrapper">
			<Row align-v="center">
				<Col>
					<div class="ui-userbar-mobile">
						<button class="ui-userbar-menu" @click="onToggleMenu">
							<Icon name="menu" />
						</button>
						<!-- <Logo class="logo logo-small" /> -->
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
				</Col>

				<Col cols="auto">
					<div class="ui-userbar-notification" @click="onNotification">
						<div class="ui-userbar-notification-button" :class="{ '-new': notifications }">
							<Icon name="notifications" />
						</div>
					</div>
				</Col>

				<Col cols="auto">
					<div class="ui-userbar-btn">
						<Dropdown right>
							<template #button-content>
								<div class="ui-userbar-btn-wrapper">
									<div class="ui-userbar-btn-avatar">
										<img :src="user.image.src" v-if="user.image" />
										<span v-else>
											{{ initials }}
										</span>
									</div>
									<div class="ui-userbar-btn-info" v-if="user.name">
										<span class="name">{{ user.name }}</span>
										<span v-if="slug" class="slug">{{ slug }}</span>
									</div>
								</div>
							</template>
							<slot name="user-links" />
							<component :is="getComponent(item)" v-for="item in dropdown" :key="item">
								<Icon :name="item.icon" v-if="item.icon" />
								<span>{{ item.text }}</span>
								<!-- <Icon name="open_in_new" style="font-size: 13px; margin-left: auto; opacity: 0.3" v-if="item.href" /> -->
							</component>
						</Dropdown>
					</div>
				</Col>
			</Row>
		</div>
		<!-- <Modal ref="modal" title="Notificações" size="sm">
			<MessageShow />
		</Modal>
		<Modal ref="modalAffiliate" :title="'Indique & Ganhe!'">
			<AffiliateModal />
		</Modal> -->
	</div>
</template>

<style lang="scss">
@import './Userbar.scss';
</style>
