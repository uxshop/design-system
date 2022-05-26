<script setup lang="ts">
import Icon from '../../../ui/icon/Icon.vue'
const emit = defineEmits<{
	(e: 'resetQueryParams'): void
}>()
</script>

<template>
	<div class="table-list-empty-search">
		<div class="table-list-empty-search-icon">
			<Icon name="search" size="40" />
		</div>
		<div class="table-list-empty-search-title">Sua pesquisa não retornou nenhum resultado.</div>
		<div class="table-list-empty-search-text">
			Essa opção não existe na sua nave, tente
			<a @click="emit('resetQueryParams')">outra opção de filtro</a>.
		</div>
	</div>
</template>

<style lang="scss">
.table-list-empty-search {
	padding: 20px;
	border-radius: var(--border-radius);
	text-align: center;
	background-color: var(--gray-100);
	margin: 0 20px;
	margin-top: 20px;

	.table-list-empty-search-icon {
		opacity: 0.4;
	}

	.table-list-empty-search-title {
		font-size: 20px;
		font-weight: var(--font-weight-bold);
		margin-bottom: 5px;
	}
}
</style>
