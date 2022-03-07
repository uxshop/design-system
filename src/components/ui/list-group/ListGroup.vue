<script setup lang="ts">
import { ref } from 'vue'

const classList = ref<string[]>()
</script>

<template>
	<div class="ui-list-group">
		<slot />
	</div>
</template>

<style lang="scss">
@import './ListGroup.scss';
</style>
