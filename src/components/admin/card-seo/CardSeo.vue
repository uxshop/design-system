<script setup lang="ts">
import { computed } from 'vue'
import Card from '../../ui/card/Card.vue'
import Seo, { type SeoInterface } from '../seo/Seo.vue'

const props = defineProps<{
	modelValue: SeoInterface
	keyTitle?: string
	keySubTitle?: string
	keyDescription?: string
	domain: string
}>()

const emit = defineEmits(['update:modelValue'])

const seoModelValue = computed({
	get() {
		return props.modelValue
	},
	set(newValue) {
		emit('update:modelValue', newValue)
	}
})
</script>

<template>
	<Card dropdown class="card-seo" dropdownLabel="Editar" title="Pré-visualização no Google" dropdownClosed>
		<template #header-caption>
			<Seo
				v-model="seoModelValue"
				:keyTitle="keyTitle"
				:keySubTitle="keySubTitle"
				:keyDescription="keyDescription"
				:domain="domain"
				viewOnly
				gray />
		</template>
		<Seo v-model="seoModelValue" write-only gray />
	</Card>
</template>
