<script setup lang="ts">
import { computed } from 'vue'
import { initials as filterInitials } from '../../../../filters'
import Icon from '../../../ui/icon/Icon.vue'

const props = defineProps<{
	userName: string
	caption?: string
	image?: string
  hideIcon?: boolean
}>()

const userInitials = computed(() => filterInitials(props.userName))
</script>
<template>
	<div class="user-card-btn-wrapper">
		<div class="user-card-btn-avatar">
			<img v-if="image" :src="image" />
			<span v-else>
				{{ userInitials }}
			</span>
		</div>
		<div class="user-card-btn-text" v-if="userName">
			<div class="user-card-btn-text-info">
				<span class="name">{{ userName }}</span>
				<span v-if="caption" class="user-card-btn-text-caption">{{ caption }}</span>
			</div>
			<span class="icon-arrow-up">
				<Icon v-if="!hideIcon" name="keyboard_arrow_up" size="sm" />
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import './UserButton.scss';
</style>
