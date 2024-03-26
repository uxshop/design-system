<script setup lang="ts">
defineProps<{ userName?: string; message?: string }>()
</script>

<template>
	<div class="home-bar">
		<h5 class="-title" v-if="userName">Olá, {{ userName }}!</h5>
		<h5 class="-title" v-if="message">{{ message }}!</h5>
		<slot name="content" />
	</div>
</template>

<style lang="scss">
@import './HomeBar.scss';
</style>
