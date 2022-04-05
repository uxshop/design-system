<script setup lang="ts">
import Card from '../../ui/card/Card.vue'
import Seo from '../seo/Seo.vue'
defineProps<{
	modelValue?: any
	keyTitle?: string
	keySubTitle?: string
	keyDescription?: string
}>()
</script>

<template>
	<Card dropdown white class="card-seo" dropdown-label="Editar" title="SEO" dropdown-closed>
		<template #header-caption>
			<Seo
				v-model="modelValue"
				:keyTitle="keyTitle"
				:keySubTitle="keySubTitle"
				:keyDescription="keyDescription"
				viewOnly />
		</template>
		<Seo v-model="modelValue" write-only />
	</Card>
</template>
