<script setup lang="ts">
import { getCurrentInstance, ref, useSlots, watchEffect } from 'vue'
import Icon from '../icon/Icon.vue'

const emit = defineEmits(['toggleShowBody', 'open', 'close'])

interface Props {
	title?: string
	titleMuted?: string
	caption?: string
	dropdown?: boolean
	dropdownLabel?: string
	dropdownClosed?: boolean
	fullHeight?: boolean
	success?: boolean
	noBorder?: boolean
	closeCaption?: string
	gray?: boolean
	last?: boolean
	blocked?: boolean
	dropdownMobile?: string
}

const props = withDefaults(defineProps<Props>(), {
	dropdownClosed: false
})

const isDropdown = ref(props.dropdown)
const cardTitle = ref(props.title)
const showBody = ref(!props.dropdownClosed)
const uid = `ui-card-${getCurrentInstance()?.uid}`
const slots = useSlots()

const haveSlot = (name = 'default') => {
	return !!slots[name]
}

const toggleShowBody = () => {
	emit('toggleShowBody')

	if (!showBody.value) {
		emit('open')
	}

	if (showBody.value) {
		emit('close')
	}

	showBody.value = !showBody.value
}

const onBlockedClick = () => {
	// bus.$emit('upgrade-dialog', this.blocked)
}

watchEffect(() => (showBody.value = !props.dropdownClosed))
</script>

<template>
	<div
		class="ui-card"
		:id="uid"
		:class="{
			'-hide': !showBody,
			'-collapse': isDropdown,
			'-gray': gray,
			'-no-border': noBorder,
			'-last': last,
			'-full-height': fullHeight,
			'-blocked': blocked,
			'-success': success
		}">
		<div
			class="ui-card-header"
			@click="isDropdown ? toggleShowBody() : null"
			v-if="cardTitle || haveSlot('header-title')">
			<div class="ui-card-header-content">
				<slot name="header-title">
					<h4 v-if="cardTitle" class="ui-card-title">
						<span>{{ cardTitle }}</span>
					</h4>
					<span v-if="titleMuted" class="muted" v-html="titleMuted"></span>
				</slot>
				<div class="ui-card-header-content-button">
					<slot name="header-button" v-if="haveSlot('header-button')" />
					<button type="button" class="btn-collapse" v-if="isDropdown">
						<div v-if="showBody">
							<Icon name="expand_less" />
						</div>
						<div v-if="!showBody">
							<span v-if="dropdownLabel">{{ dropdownLabel }}</span>
							<Icon v-else name="expand_more" />
						</div>
					</button>
				</div>
			</div>
			<div v-if="caption" class="ui-card-caption" v-html="caption"></div>
			<span v-if="haveSlot('caption')" class="ui-card-caption">
				<slot name="caption" />
			</span>
			<div v-if="closeCaption && !showBody" class="ui-card-caption">{{ closeCaption }}</div>
			<div v-if="haveSlot('close-caption') && !showBody" class="ui-card-caption">
				<slot name="close-caption" />
			</div>
			<div v-if="haveSlot('header-caption')" class="ui-card-caption">
				<slot name="header-caption" />
			</div>
		</div>

		<div class="ui-card-body" v-show="showBody">
			<slot />
		</div>

		<div class="ui-card-footer" v-if="haveSlot('footer')">
			<div v-show="showBody">
				<slot name="footer" />
			</div>
		</div>

		<div class="ui-card-block" @click="onBlockedClick">
			<span class="ui-card-block-info">
				<Icon name="lock" type="rounded" />
				<Icon name="lock_open" type="rounded" />
				<span class="ui-card-block-text">Bloqueado</span>
			</span>
		</div>
	</div>
</template>

<style lang="scss">
@import './Card.scss';
</style>
