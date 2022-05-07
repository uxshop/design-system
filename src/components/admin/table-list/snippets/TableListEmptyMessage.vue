<script setup lang="ts">
defineProps({
	msg: String
})
</script>

<template>
	<div class="table-list-empty-message">
		<h4 class="table-list-empty-message-title">Esta seção não possui registros</h4>
		<div class="table-list-empty-message-text" v-html="msg"></div>
	</div>
</template>

<style lang="scss">
.table-list-empty-message {
	padding: 20px;
	border: solid 1px var(--border-color);
	border-radius: var(--border-radius);
	.table-list-empty-message-title {
		margin-bottom: 10px;
	}
}
</style>
