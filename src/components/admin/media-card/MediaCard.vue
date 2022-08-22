<script setup lang="ts">
import { ref } from 'vue'
import Card from '../../ui/card/Card.vue'
import Button from '../../ui/button/Button.vue'
import Icon from '../../ui/icon/Icon.vue'
import Modal from '../../ui/modal/Modal.vue'

const props = defineProps<{
	title: string
	text: string
	href: string
	label: string
	video?: string
	image?: string
	inverse?: boolean
}>()

const openModal = ref<boolean>(false)
const mediaCardClasses = ref<string[]>([])

if (props.inverse) mediaCardClasses.value.push('-inverted')
if (props.video) mediaCardClasses.value.push('-video')
</script>

<template>
	<div class="ui-media-card" :class="mediaCardClasses">
		<div v-if="video" class="ui-media-card-video">
			<img :src="`https://img.youtube.com/vi/${video}/mqdefault.jpg`" @click="openModal = !openModal" />
			<Modal v-model="openModal">
				<iframe :src="'https://www.youtube.com/embed/' + video + '?autoplay=1'" frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen style="height: 70vh" />
			</Modal>
			<Icon name="play_arrow" @click="openModal = !openModal" />
		</div>
		<div v-else class="ui-media-card-image">
			<img :src="image" />
		</div>
		<Card :title="title">
			<div class="ui-media-card-info">
				<p v-text="text" />
				<div>
					<Button :href="href" target="_blank" size="sm" :label="label" />
				</div>
			</div>
		</Card>
	</div>
</template>

<style lang="scss">
@import './MediaCard.scss';
</style>
