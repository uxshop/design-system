<script setup lang="ts">
defineProps<{ loading: boolean }>()
</script>

<template>
	<div class="table-list-loader" :class="{ '-show': loading }">
		<ui-spinner class="table-list-loader-spinner" size="16" />
		<span>Carregando dados da tabela</span>
	</div>
</template>

<style lang="scss">
@import './TableListNavLoader.scss';
</style>
