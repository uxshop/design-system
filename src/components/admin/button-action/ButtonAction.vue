<script lang="ts" setup>
import { watchEffect, ref, useAttrs, onMounted } from 'vue'
import dialog from '../../ui/dialog'
import IconButton from '../../ui/icon-button/IconButton.vue'

const props = defineProps<{
	type: string
	active?: boolean
	size?: string
	deleteName?: string | null
	noEvents?: boolean
}>()

const emit = defineEmits(['delete', 'inactive', 'active', 'close', 'click', 'update:active', 'toggleActive'])
const attrs = useAttrs()
const currentIcon = ref<string | undefined>()
const hasClick = attrs.click

const activeIcon = (active?: boolean) => {
	currentIcon.value = active ? 'visibility' : 'visibility_off'
}

const classType = ref(['-btn-' + props.type])

if (props.size) {
	classType.value.push(`-${props.size}`)
}

onMounted(() => {
	switch (props.type) {
		case 'remove':
			currentIcon.value = 'close'
			break
		case 'active':
			activeIcon(props.active)
			break
		default:
			currentIcon.value = props.type
			break
	}
})

if (props.type == 'active') {
	watchEffect(() => {
		activeIcon(props.active)
	})
}

const onClick = (evt: MouseEvent) => {
	if (props.type == 'edit') {
		return
	}

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
			onCallback: (val: boolean) => {
				emit('delete', val)
			}
		})
	}

	if (props.type == 'active') {
		emit('update:active', !props.active)
		emit('toggleActive')
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
