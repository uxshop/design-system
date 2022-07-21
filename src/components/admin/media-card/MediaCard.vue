<script setup lang="ts">
import Card from '../../ui/card/Card.vue'
import Button from '../../ui/button/Button.vue'
import { ref } from 'vue'
import Icon from '../../ui/icon/Icon.vue'
import Modal from '../../ui/modal/Modal.vue'

const props = defineProps({
	title: String,
	text: String,
	href: String,
	label: String,
	video: String,
	image: String,
	inverse: Boolean
})

const openModal = ref(false)

const mediaCardClass = ref<string[]>([])

if (props.inverse) {
	mediaCardClass.value.push('-inverted')
}

if (props.video) {
	mediaCardClass.value.push('-video')
}

const image =
	'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80'
</script>

<template>
	<div class="ui-media-card" :class="mediaCardClass">
		<div v-if="video" class="ui-media-card-video">
			<!-- <IconButton v-if="video" icon="play" type="filled" /> -->
			<iframe
				width="100%"
				min-height="300"
				:src="'https://www.youtube.com/embed/' + video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				@click="openModal = !openModal" />
			<Modal v-model="openModal">
				<iframe
					:src="'https://www.youtube.com/embed/' + video + '?autoplay=1'"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					style="height: 70vh" />
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
