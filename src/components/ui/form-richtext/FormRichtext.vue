<script setup lang="ts">
import { getCurrentInstance, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import './redactor/redactor'

interface Props {
	modelValue: undefined
	toolbar: object
	name: string
	placeholder: string
	label: string
	height: string | number
	config: undefined
}

const props = withDefaults(defineProps<Props>(), {
	height: 100
})

const emit = defineEmits(['update:modelValue', 'update'])

let redactor: any
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
		minHeight: '120px',
		multipleUpload: false,
		callbacks: {
			changed: (html: any) => {
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

const stopWatch = watchEffect(() => {
	const newVal = props.modelValue
	if (redactor && newVal && !redactor.editor.isFocus()) {
		redactor.source.setCode(newVal)
	}
})

const focus = () => {
	redactor.editor.focus()
}

const update = (val: any) => {
	emit('update:modelValue', val)
	emit('update', val)
}

onMounted(() => {
	// @ts-ignore
	redactor = $R(`#${uid}`, config)
})

onUnmounted(() => {
	setTimeout(() => {
		// @ts-ignore
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
@import './redactor.scss';
</style>
