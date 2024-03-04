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
		border-radius: var(--s-border-radius-small);
		background-color: var(--s-color-fill-default-light);
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.table-list-empty-search-title {
		font: var(--s-typography-heading-large);
		font-weight: var(--s-font-weight-semibold);
		margin-top: var(--s-spacing-xx-small);
		margin-bottom: var(--s-spacing-quark);
	}
}
</style>
