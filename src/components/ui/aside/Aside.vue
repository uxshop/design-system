<script setup lang="ts">
import { watchEffect, ref, useSlots } from 'vue'
import Icon from '../icon/Icon.vue'
const emit = defineEmits(['update:modelValue', 'open', 'close'])
const props = defineProps<{
	modelValue: boolean
	title?: string
	scrollable?: boolean
	noCloseOnBackdrop?: boolean
	size?: string
	inner?: boolean
}>()

const slots = useSlots()
const isOpen = ref(false)
const modalSize = props.size ? `-${props.size}` : '-md'
const currentTitle = ref(props.title)

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

const listener = (e) => {
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

defineExpose({
	changeTitle: (newTitle: string) => {
		currentTitle.value = newTitle
	}
})
</script>

<template>
	<teleport to="body">
		<div class="ui-aside">
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
				]"
			>
				<div class="ui-aside-overlay" :class="{ '-close': !noCloseOnBackdrop }" @click="onClickBackdrop"></div>

				<div class="ui-aside-content">
					<div class="ui-aside-header">
						<h4 class="title">
							{{ currentTitle }}
						</h4>
						<button @click="onClose" class="close" id="btn-close">
							<span>fechar</span>
							<icon name="close" />
						</button>
					</div>

					<div class="ui-aside-body">
						<slot name="default" />
					</div>

					<div class="ui-aside-footer" v-if="haveSlot('footer')">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<style lang="scss">
@import './Aside.scss';
</style>
