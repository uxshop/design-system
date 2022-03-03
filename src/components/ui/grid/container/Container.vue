<script setup lang="ts">
import { ref } from 'vue'
const classList = ref(['container'])
</script>

<template>
	<div :class="classList">
		<slot />
	</div>
</template>

<style lang="scss">
@import '../../../../scss/mixins.scss';

.container {
	@include container;
}
</style>
