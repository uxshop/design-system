<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
	document.body.classList.add('not-found')
})

onUnmounted(() => {
	document.body.classList.remove('not-found')
})
</script>

<template>
	<div class="content-404">
		<div class="empty-center">
			<div class="empty-info">
				<p>A página que você está procurando não existe mais, <br />ou está em outro link.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Content404.scss';
</style>
