<script setup lang="ts">
import Card from '../../ui/card/Card.vue'
import Seo from '../seo/Seo.vue'
defineProps<{
	modelValue: any
	keyTitle?: string
	keySubTitle?: string
	keyDescription?: string
	domain: string
}>()
</script>

<template>
	<Card dropdown white class="card-seo" dropdownLabel="Editar" title="Pré-visualização no Google" dropdownClosed>
		<template #header-caption>
			<Seo
				v-model="modelValue"
				:keyTitle="keyTitle"
				:keySubTitle="keySubTitle"
				:keyDescription="keyDescription"
				:domain="domain"
				viewOnly />
		</template>
		<Seo v-model="modelValue" write-only />
	</Card>
</template>
