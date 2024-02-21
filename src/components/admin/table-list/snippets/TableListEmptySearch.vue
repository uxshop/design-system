<script setup lang="ts">
import Icon from '../../../ui/icon/Icon.vue'
const emit = defineEmits<{
	(e: 'resetQueryParams'): void
}>()
</script>

<template>
	<div class="table-list-empty-search">
		<div class="table-list-empty-search-content">
			<div class="table-list-empty-search-icon">
				<Icon name="search" size="40" />
			</div>
			<div class="table-list-empty-search-title">Sua pesquisa não retornou nenhum resultado</div>
			<div class="table-list-empty-search-text">
				Essa opção não existe na sua loja, tente
				<a @click="emit('resetQueryParams')">outra opção de filtro</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.table-list-empty-search {
	text-align: center;
	height: 100%;
	padding: var(--s-spacing-x-small);

	.table-list-empty-search-content {
		border-radius: var(--border-radius);
		background-color: var(--gray-100);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

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
