<script setup lang="ts">
import { getCurrentInstance, ref, useSlots, watchEffect } from 'vue'
import Icon from '../icon/Icon.vue'
import Spinner from '../spinner/Spinner.vue'
import Button from '../button/Button.vue'
import Link from '../link/Link.vue'
import Stack from '../stack/Stack.vue'
import type { IAction } from '../../../types/IAction'

export interface Props {
	title?: string
	titleMuted?: string
	caption?: string
	dropdown?: boolean
	dropdownLabel?: string
	dropdownClosed?: boolean
	fullHeight?: boolean
	success?: boolean
	noBorder?: boolean
	noPadding?: boolean
	closeCaption?: string
	gray?: boolean
	last?: boolean
	dropdownMobile?: string
	loading?: boolean
	transparent?: boolean
	plain?: boolean
	actions?: IAction[]
}

const emit = defineEmits(['toggleShowBody', 'open', 'close'])

const props = withDefaults(defineProps<Props>(), {
	dropdownClosed: false
})

const isDropdown = ref(props.dropdown)
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
			'-success': success,
			'-loading': loading,
			'-transparent': transparent,
			'-no-padding': noPadding,
			'-plain': plain
		}">
		<div class="ui-card-loading" v-if="loading">
			<Spinner size="50" />
		</div>
		<div class="ui-card-header" @click="isDropdown ? toggleShowBody() : null" v-if="title || haveSlot('header-title')">
			<div class="ui-card-header-content">
				<div class="ui-header-content-title">
					<slot name="header-title">
						<h4 v-if="title" class="ui-card-title">
							<span>{{ title }}</span>
							<span v-if="titleMuted" class="muted" v-html="titleMuted"></span>
						</h4>
					</slot>
					<div v-if="caption" class="ui-card-caption" v-html="caption"></div>
					<span v-if="haveSlot('caption')" class="ui-card-caption">
						<slot name="caption" />
					</span>
				</div>
				<div class="ui-card-header-content-button">
					<Link v-for="item in actions" :key="item.label" @click="item.onAction">
						{{ item.label }}
					</Link>
					<slot name="header-button" v-if="haveSlot('header-button')" />
					<button type="button" class="btn-collapse" v-if="isDropdown">
						<div v-if="showBody">
							<Icon class="btn-collapse-icon" name="expand_less" />
						</div>
						<div v-if="!showBody">
							<Link v-if="dropdownLabel">{{ dropdownLabel }}</Link>
							<Icon class="btn-collapse-icon" v-else name="expand_more" />
						</div>
					</button>
				</div>
			</div>

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

		<div class="ui-card-footer" v-if="haveSlot('footer')" v-show="showBody">
			<slot name="footer" />
		</div>
	</div>
</template>

<style lang="scss">
@import './Card.scss';
</style>
