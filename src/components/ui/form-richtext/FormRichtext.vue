<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, watchEffect } from 'vue'
import './redactor/redactor'

export interface Props {
	modelValue?: any
	toolbar?: object
	name?: string
	placeholder?: string
	label?: string
	height?: string | number
	config?: Record<string, string>
}

type TRedactor = {
	editor: {
		focus(): void
		source: {
			setCode(val: any): void
		}
	}
} | null

const props = withDefaults(defineProps<Props>(), {
	height: 120
})

const emit = defineEmits(['update:modelValue', 'update'])

let redactor: TRedactor
let focused = false
const uid = `ui-form-richtext-${getCurrentInstance()?.uid}`
const config = Object.assign(
	{
		// imageUpload: MediaService.getUploadUrl(),
		// imageManagerJson: MediaService.getUrl(),
		lang: 'pt_br',
		toolbarFixed: false,
		imagePosition: true,
		imageResizable: true,
		tabAsSpaces: 4,
		plugins: ['source', 'video', 'table', 'alignment', 'fullscreen', 'imagemanager'],
		buttons: ['html', 'formatting', 'bold', 'italic', 'lists', 'link', 'horizontalrule', 'image'],
		maxHeight: '600px',
		minHeight: `${props.height}px`,
		multipleUpload: false,
		callbacks: {
			focus: function () {
				focused = true
			},
			blur: function () {
				focused = false
			},
			changed: (html: string) => {
				emit('update:modelValue', html)
				return html
			}
			// 	upload: {
			// 		beforeSend: xhr => {
			// 			const token = StorageService.BEARER_TOKEN
			// 			xhr.setRequestHeader('Authorization', `Bearer ${token}`)
			// 			xhr.setRequestHeader('Richtext', 1)
			// 		}
			// 	},
			// 	image: {
			// 		uploaded: (image, response) => {
			// 			// image.childNodes[1].src = response.file.url.replace('uploads://', `${process.env.VUE_APP_UPLOAD_URL}/`)
			// 			image.childNodes[1].src = response.file.url.replace(
			// 				'media://',
			// 				process.env.VUE_APP_CDN_URL + '/' + this.$store.getters.shop.id + '/'
			// 			)
			// 			// $img.attr('src', $filter('img_url')(src))
			// 			// var file = $filter('img_url')(response.file);
			// 			// $(image).find('img').attr('src', file);
			// 		}
			// 	}
		}
	},
	props.config
)

const focus = () => {
	if (redactor) {
		redactor.editor.focus()
	}
}

onMounted(() => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line no-undef
	redactor = $R(`#${uid}`, config)
})

watchEffect(() => {
	const value = props.modelValue
	if (redactor && !focused) {
		redactor.editor.source.setCode(value)
	}
})

onUnmounted(() => {
	setTimeout(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line no-undef
		$R(`#${uid}`, 'destroy')
		redactor = null
	}, 300)
})
</script>

<template>
	<div class="ui-form-richtext">
		<label :for="name" v-if="label" class="form-control-label" @click="focus">{{ label }}</label>
		<textarea :name="name" :placeholder="placeholder" :value="modelValue" :id="uid" />
	</div>
</template>

<style lang="scss">
@import './FormRichtext.scss';
</style>
