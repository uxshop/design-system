<script setup lang="ts">
import { ref } from 'vue'

const scrolled = ref(false)

const onScroll = (e: UIEvent) => {
	const target = e.target as HTMLDivElement
	scrolled.value = target.scrollTop > 20
}
</script>

<template>
	<div class="wrapper" @scroll="onScroll" id="wrapper">
		<slot name="sidebar" />
		<div class="main" :class="{ 'main-scrolled': scrolled }">
			<div class="main-navbar">
				<slot name="navbar" />
			</div>
			<!-- <not-found v-if="notFound" /> -->
			<router-view v-slot="{ Component }">
				<transition name="slide-fade" mode="out-in">
					<div class="main-content">
						<component :is="Component" />
					</div>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<style lang="scss">
@import './layout.scss';
</style>
