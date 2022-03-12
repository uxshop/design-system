<script setup lang="ts">
import { shallowRef } from 'vue'

interface Props {
	logo: string
}

withDefaults(defineProps<Props>(), {
	logo: 'logo'
})

const logo = shallowRef(
	`<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 110 110"><style>.st0{fill:#c1cbcd}.st1{fill:#00d9ff}.st2{fill:#ffc200}</style><path class="st0" d="M51.1 87.8H27.2V22.6h23.9c18 0 32.6 14.6 32.6 32.6S69.1 87.8 51.1 87.8m-16.3-7.6h16.3c13.8 0 25-11.2 25-25s-11.2-25-25-25H34.8v50z"/><path class="st1" d="M.7 1h104.4v7.6H.7zM.7 101.8h104.4v7.6H.7z"/><path class="st2" d="M.5 8.6h7.6v93.2H.5zM101.3 8.6h7.6v93.2h-7.6z"/><path class="st0" d="M101.3 1h7.6v7.6h-7.6zM101.3 101.8h7.6v7.6h-7.6zM.5 1h7.6v7.6H.5zM.5 101.8h7.6v7.6H.5z"/></svg>`
)
</script>

<template>
	<div class="ui-logo">
		<div class="ui-logo-image" v-html="logo"></div>
	</div>
</template>

<style lang="scss">
@import './Logo.scss';
</style>
