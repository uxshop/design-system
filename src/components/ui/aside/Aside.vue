<script setup lang="ts">
import { watchEffect, ref, useSlots } from 'vue'
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'

export interface IAction {
	label: string
	form?: string
	icon?: string
	onAction?(): void
}

const emit = defineEmits(['update:modelValue', 'open', 'close'])
const props = defineProps<{
	modelValue?: boolean
	title?: string
	subtitle?: string
	scrollable?: boolean
	noCloseOnBackdrop?: boolean
	size?: string
	tag?: string
	inner?: boolean
	primaryAction?: IAction
}>()

const slots = useSlots()
const isOpen = ref(false)
const modalSize = props.size ? `-${props.size}` : '-md'

const haveSlot = (name = 'default') => {
	return !!slots[name]
}

const close = () => {
	window.removeEventListener('keydown', listener, false)
	document.body.classList.remove('aside-open')
	setTimeout(() => {
		emit('close')
		isOpen.value = false
	}, 300)
}

const open = () => {
	isOpen.value = true
	window.addEventListener('keydown', listener, false)
	document.body.classList.add('aside-open')
	emit('open')
}

const onClickBackdrop = () => {
	if (!props.noCloseOnBackdrop) {
		emit('update:modelValue', false)
	}
}

const onClose = () => emit('update:modelValue', false)

const listener = (e: { key: string }) => {
	if (e.key == 'Escape') {
		onClickBackdrop()
	}
}

watchEffect(() => {
	if (props.modelValue) {
		open()
	} else {
		close()
	}
})
</script>

<template>
	<Teleport to="body">
		<component :is="tag ? tag : 'div'" class="ui-aside">
			<div
				v-if="isOpen"
				class="ui-aside-wrapper"
				:class="[
					modalSize,
					{
						'-hide': !modelValue,
						'-scrollable': scrollable,
						'-inner': inner
					}
				]">
				<div class="ui-aside-overlay" :class="{ '-close': !noCloseOnBackdrop }" @click="onClickBackdrop"></div>

				<div class="ui-aside-content">
					<div class="ui-aside-header">
						<div>
							<h4 class="title">
								{{ title }}
							</h4>
							<small class="d-block text-muted" v-if="subtitle">{{ subtitle }}</small>
						</div>
						<button @click="onClose" class="close" id="btn-close" type="button">
							<span>fechar</span>
							<Icon name="close" />
						</button>
					</div>

					<div class="ui-aside-body">
						<slot name="default" />
					</div>

					<div class="ui-aside-footer" v-if="primaryAction">
						<div class="ui-aside-footer-primary">
							<Button
								type="submit"
								variant="primary"
								@click="primaryAction.onAction"
								:label="primaryAction.label"
								:form="primaryAction.form" />
						</div>
					</div>
					<div class="ui-aside-footer" v-if="haveSlot('footer')">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</component>
	</Teleport>
</template>

<style lang="scss">
@import './Aside.scss';
</style>
