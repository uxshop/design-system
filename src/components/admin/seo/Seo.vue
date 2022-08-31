<script setup lang="ts">
import Row from '../../ui/grid/row/Row.vue'
import Col from '../../ui/grid/col/Col.vue'
import Alert from '../../ui/alert/Alert.vue'
import AlertTitle from '../../ui/alert/AlertTitle.vue'
import { computed, ref, watchEffect } from 'vue'
import { slugify as _slugify, truncate } from '../../../filters'
import FormTextfield from '../../ui/form-textfield/FormTextfield.vue'

interface Props {
	title?: string
	domain?: string
	modelValue?: any
	viewOnly?: boolean
	writeOnly?: boolean
	isMetaTitle?: boolean
	gray?: boolean
	slugify?: boolean
	keyTitle?: string
	keySubTitle?: string
	keyDescription?: string
	metaTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
	slugify: true,
	keyTitle: 'meta_title',
	keySubTitle: 'meta_subtitle',
	keyDescription: 'meta_description'
})

const TITLE_SEPARATOR = ' | '

const metaTitle = ref('')
const metaSubtitle = ref<string | number | null>('')
const urlRewrite = ref('')
const metaDescription = computed(() => {
	const desc = formatMetaDescription(props.modelValue[props.keyDescription] || '')
	return truncate(desc, 250, '...')
})

const formatMetaTitle = (value: string) => {
	if (value && props.metaTitle && !props.isMetaTitle) {
		value = value + TITLE_SEPARATOR + props.metaTitle
	}

	return value
}

const formatMetaDescription = (value: any) => {
	if (value) {
		value = value.replace(/(<([^>]+)>)/gi, '')
	}

	return value
}

watchEffect(() => {
	if (props.modelValue) {
		metaTitle.value = formatMetaTitle(props.modelValue[props.keyTitle] || props.modelValue.name || metaTitle.value)
		metaSubtitle.value = props.modelValue[props.keySubTitle] || null
		urlRewrite.value = _slugify(props.modelValue.slug) || _slugify(metaTitle.value)
	}
})
</script>

<template>
	<div class="ui-seo" :class="{ '-gray': gray }">
		<Row>
			<Col v-if="!viewOnly">
				<FormTextfield v-model="modelValue.meta_title" placeholder="Meta title" label="Meta title" countable />
				<FormTextfield
					v-model="modelValue.meta_description"
					placeholder="Meta description"
					label="Meta description"
					maxlength="250"
					type="textarea"
					countable />
				<FormTextfield
					v-model="modelValue.meta_keywords"
					placeholder="Ex: palavra1, palavra2"
					label="Meta keywords"
					maxlength="200"
					countable />
				<FormTextfield v-model="modelValue.slug" placeholder="Ex: minha-url-amigavel" label="Url amigável" />
			</Col>
			<Col v-if="!writeOnly">
				<div class="ui-seo-card">
					<b class="ui-seo-title">
						{{ metaTitle }}
						<span v-if="metaSubtitle">- {{ metaSubtitle }}</span>
					</b>
					<span class="ui-seo-domain">
						https://{{ domain }}<span v-show="urlRewrite && slugify === true">/{{ urlRewrite }}</span>
					</span>
					<div class="ui-seo-description" v-if="metaDescription">
						{{ metaDescription }}
					</div>
				</div>
			</Col>
		</Row>
		<Alert variant="primary" :show="!viewOnly" :style="{ marginTop: '10px' }">
			<AlertTitle>Dicas de cadastro</AlertTitle>
			<ul>
				<li><b>Meta title</b>: até 90 caracteres; Google exibe somente 63</li>
				<li><b>Meta description</b>: até 250 caracteres; Google exibe somente 160</li>
				<li><b>Meta keywords</b>: até 200 caracteres, separados por vírgula</li>
			</ul>
		</Alert>
		<Alert variant="warning" :show="!viewOnly" icon="warning" last>
			Importante: a plataforma se encarrega de preencher estes dados básicos automaticamente. Caso você opte por
			preenchê-los manualmente, o sistema irá ignorar os dados gerados de forma dinâmica e exibirá os dados que você
			cadastrou.
		</Alert>
	</div>
</template>

<style lang="scss">
@import './Seo.scss';
</style>
