<script setup lang="ts">
import { computed } from 'vue'
import { initials as filterInitials } from '../../../filters'
import { DropdownItem, DropdownItemButton, DropdownDivider, Dropdown } from '../../ui/dropdown'
import Icon from '../../ui/icon/Icon.vue'
import type { IDropdownItem, UserCard } from './types'

const props = defineProps<{
	user: UserCard
	caption?: string
	dropdown?: any[]
	label?: string
	dropUp?: boolean
}>()
const initials = computed(() => {
	return filterInitials(props.user.name)
})
const getComponent = (item: IDropdownItem) => {
	if (!item.text) {
		return DropdownDivider
	}
	if (item.to) {
		return DropdownItem
	}
	if (item.href) {
		return DropdownItem
	}
	return DropdownItemButton
}
</script>

<template>
	<div class="user-card">
		<small v-if="label" class="user-card-label">{{ label }}</small>
		<div class="user-card-btn">
			<Dropdown right closeOn drop-up>
				<template #button-content>
					<div class="user-card-btn-wrapper">
						<div class="user-card-btn-avatar">
							<img :src="user.image.src" v-if="user.image" />
							<span v-else>
								{{ initials }}
							</span>
						</div>
						<div class="user-card-btn-text" v-if="user.name">
							<div class="user-card-btn-text-info">
								<span class="name">{{ user.name }}</span>
								<span v-if="caption" class="slug">{{ caption }}</span>
							</div>
							<Icon name="keyboard_arrow_up" size="sm" />
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
</template>

<style lang="scss">
@import './UserProfileCard.scss';
</style>
