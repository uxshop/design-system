<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import Logo from '../logo/Logo.vue'
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Breadcrumb from '../../ui/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '../../ui/breadcrumb/BreadcrumbItem.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import DropdownItem from '../../ui/dropdown/DropdownItem.vue'
import DropdownItemButton from '../../ui/dropdown/DropdownItemButton.vue'
import DropdownDivider from '../../ui/dropdown/DropdownDivider.vue'
import Icon from '../../ui/icon/Icon.vue'
import { initials as filterInitials } from '../../../filters'

const props = defineProps<{
	slug?: string
	backlink?: { to: string }
	breadcrumb?: { to: string; name: string }[]
	notifications?: object
	user: { name: string; image: string | any }
}>()

const emit = defineEmits(['toggleMenu'])

const menu = inject<any>('menu')

const onDropDrownItem = (item: any) => {
	switch (item.type) {
		case 'divider':
			return 'ui-dropdown-divider'
		case 'link':
			return 'ui-dropdown-item'
		case 'button':
			return 'ui-dropdown-item-button'
	}
}

const initials = computed(() => {
	return filterInitials(props.user.name)
})

const onToggleMenu = () => {
	emit('toggleMenu')
	menu.toggle()
}
// data() {
// 	return {
// 		breadcrumb: [],
// 		notifications: false
// 	}
// }
// computed: {
// 	...mapGetters(['user', 'shop']),

// 	backlink() {
// 		return this.$store.state.metaBacklink
// 	},

// 	dropdownComponent() {
// 		if (window.partner) {
// 			return 'ThePartnerSidebarMenu'
// 		}
// 		if (window.erp) {
// 			return 'TheErpSidebarMenu'
// 		}

// 		return 'TheDefaultSidebarMenu'
// 	}
// },
// created() {
// 	this.$model
// 		.message_viewed()
// 		.get()
// 		.then(res => {
// 			if (res) {
// 				if (res.viewed.includes(this.user.id.toString())) {
// 					this.notifications = false
// 				} else {
// 					this.notifications = true
// 				}
// 			}
// 		})
// },
// methods: {
// 	onNotification() {
// 		this.notifications = false
// 		this.$refs.modal.open().then()
// 	},
// 	onAffiliate() {
// 		this.$refs.modalAffiliate.open().then()
// 	},

// 	onLogout() {
// 		this.$store.dispatch('logout')
// 	}
// },
// watch: {
// 	$route: {
// 		immediate: true,
// 		handler: function (to) {
// 			this.$store.dispatch('metaBacklink', null)
// 			this.breadcrumb = to.meta.breadcrumb

// 			if (to.meta.title) {
// 				this.$store.dispatch('metaTitle', to.meta.title)
// 			}

// 			if (to.meta.breadcrumb) {
// 				const backlink = to.meta.breadcrumb[to.meta.breadcrumb.length - 1]

// 				if (backlink.to) {
// 					this.$store.dispatch('metaBacklink', {
// 						to: backlink.to,
// 						name: backlink.name
// 					})
// 				}
// 			}
// 		}
// 	}
// }
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
						<Logo class="logo logo-small" />
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
						</Dropdown>
					</div>
				</Col>
			</Row>
		</div>
		<Modal ref="modal" title="Notificações" size="sm">
			<!-- <MessageShow /> -->
		</Modal>
		<Modal ref="modalAffiliate" :title="'Indique & Ganhe!'">
			<!-- <AffiliateModal /> -->
		</Modal>
	</div>
</template>

<style lang="scss">
@import './userbar.scss';
</style>
