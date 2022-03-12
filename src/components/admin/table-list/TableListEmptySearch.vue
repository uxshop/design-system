<script setup lang="ts">
const emit = defineEmits<{
	(e: 'resetQueryParams'): void
}>()
</script>

<template>
	<div class="table-list-empty-search">
		<div class="table-list-empty-search-title">Sua pesquisa não retornou nenhum resultado.</div>
		<div class="table-list-empty-search-text">
			Ops! Essa opção não existe na sua nave, tente
			<a @click="emit('resetQueryParams')">outra opção de filtro</a>.
		</div>
	</div>
</template>

<style lang="scss">
.table-list-empty-search {
	padding: 20px;
	border: solid 1px var(--border-color);
	border-radius: var(--border-radius);
	.table-list-empty-search-title {
		font-size: 20px;
		font-weight: var(--font-weight-bold);
		margin-bottom: 10px;
	}
}
</style>
