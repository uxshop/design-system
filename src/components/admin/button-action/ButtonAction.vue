<script lang="ts" setup>
import { watchEffect, ref, useAttrs } from 'vue'
import dialog from '../../ui/dialog'
import IconButton from '../../ui/icon-button/IconButton.vue'

const props = defineProps<{
	type: string
	modelValue?: boolean
	active?: boolean
	size?: string
	deleteName?: string
	noEvents?: boolean
}>()

const emit = defineEmits(['delete', 'inactive', 'active', 'close', 'click', 'update:active'])
const attrs = useAttrs()
const currentIcon = ref()
const hasClick = attrs.click

const activeIcon = (active?: boolean) => {
	currentIcon.value = active ? 'visibility' : 'visibility_off'
}

const classType = ref(['-btn-' + props.type])

if (props.size) {
	classType.value.push(`-${props.size}`)
}

switch (props.type) {
	case 'add':
		currentIcon.value = 'add'
		break
	case 'edit':
		currentIcon.value = 'edit'
		break
	case 'delete':
		currentIcon.value = 'delete'
		break
	case 'remove':
		currentIcon.value = 'close'
		break
	case 'active':
		activeIcon(props.active)
		break
}

if (props.type == 'active') {
	watchEffect(() => {
		activeIcon(props.active)
	})
}

const onClick = (evt: MouseEvent) => {
	emit('click')

	if (!props.noEvents) {
		evt.stopPropagation()
	}

	if (props.type == 'delete' && !hasClick) {
		let msg = 'Você confirma a exclusão do registro'
		if (props.deleteName) {
			msg += ` ${props.deleteName}`
		}
		msg += '?'
		dialog.delete({
			title: 'Excluir registro',
			message: msg,
			callback: (val: boolean) => {
				emit('delete', val)
			}
		})
	}

	if (props.type == 'active') {
		emit('update:active', !props.active)
		if (props.active) {
			emit('inactive')
		} else {
			emit('active')
		}
	}
}
</script>

<template>
	<IconButton
		class="ui-button-action"
		@click="onClick"
		:icon="currentIcon"
		:class="[classType, { '-inactive': !active }]" />
</template>

<style lang="scss">
@import './ButtonAction.scss';
</style>
