<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import UiRow from '../grid/row/Row.vue'
import UiCol from '../grid/col/Col.vue'
import UiButton from '../button/Button.vue'
import FormTextfield from '../form-textfield/FormTextfield.vue'

interface Props {
	id: string
	title: string
	hideFooter: boolean
	message: string
	callback(val: string | boolean): void
	closeOnBackdrop: boolean
	variant: string
	size: string
	promptLabel: string
	promptType: string
	promptPlaceholder: string
	cancelLabel: string
	destructLabel: string
	destructVariant: string
	destructIcon: string
	type: string
}

const props = withDefaults(defineProps<Props>(), {
	variant: '',
	size: 'md',
	promptType: 'text',
	cancelLabel: 'Cancelar',
	destructLabel: 'Deletar',
	destructVariant: 'danger'
})

const emit = defineEmits(['close', 'destrcut'])
const closed = ref(false)
const classList = ref<string[]>([])
const isPrompt = ref(false)

const style = ref<{
	transform?: string
}>({})

const prompt = ref()

const state = reactive({
	option: {},
	showing: false,
	timer: null
})
const dialogRef = ref()
const config = reactive({
	destructLabel: props.destructLabel,
	destructIcon: props.destructIcon,
	destructVariant: props.destructVariant
})

const close = (val?: boolean) => {
	document.body.classList.remove('dialog-open')
	window.removeEventListener('keydown', listener, false)
	closed.value = true
	state.timer = null
	state.showing = false

	if (props.callback && val) {
		props.callback(val)
		emit('destrcut', val)
	}

	setTimeout(() => {
		const ele = document.getElementById(props.id)
		if (ele) {
			document.body.removeChild(ele)
		}
	}, 300)
}

const onConfirm = () => {
	close(prompt.value || true)
}

const onClickBackdrop = () => {
	if (props.closeOnBackdrop) {
		close()
	} else {
		style.value.transform = 'scale(1.03)'

		setTimeout(() => {
			style.value.transform = 'scale(1)'
		}, 100)
	}
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

if (props.type == 'prompt') {
	isPrompt.value = true
}

const listener = (e: { key: string }) => {
	if (e.key == 'Escape') {
		onClickBackdrop()
	}
}

onMounted(() => {
	state.showing = true
	window.addEventListener('keydown', listener, false)
	document.body.classList.add('dialog-open')

	nextTick(() => {
		dialogRef.value.focus()
	})
})
</script>

<template>
	<div
		class="ui-dialog"
		tabindex="0"
		ref="dialogRef"
		:class="[{ '-hide': state.showing === false, '-show': state.showing }, classList]"
	>
		<div class="ui-dialog-wrapper" :style="style">
			<div class="ui-dialog-overlay" @click="onClickBackdrop"></div>

			<form class="ui-dialog-content" @submit.prevent="onConfirm" ref="form">
				<div class="ui-dialog-header" v-if="title">
					<h4 class="title" v-html="title"></h4>
				</div>
				<div class="ui-dialog-body">
					<slot />
					<div v-html="message"></div>
					<div class="ui-dialog-prompt mt-5" v-if="isPrompt">
						<FormTextfield
							:label="promptLabel"
							:placeholder="promptPlaceholder"
							:type="promptType"
							v-model="prompt"
							size="sm"
							id="prompt"
							required
							last
						/>
					</div>
				</div>
				<div class="ui-dialog-footer" v-if="!hideFooter">
					<ui-row align-v="center">
						<ui-col>
							<ui-button
								v-if="type != 'confirm'"
								@click="close(false)"
								variant="link"
								flush="left"
								class="ui-dialog-btn-cancel"
								size="sm"
							>
								{{ cancelLabel }}
							</ui-button>
						</ui-col>
						<ui-col auto>
							<ui-button
								:leadingIcon="config.destructIcon"
								:variant="destructVariant"
								type="submit"
								class="btn-destruct"
								block
								tabindex="0"
							>
								{{ config.destructLabel }}
							</ui-button>
						</ui-col>
					</ui-row>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="scss">
@import './Dialog.scss';
</style>
