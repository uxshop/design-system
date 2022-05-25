<template>
	<span></span>
</template>

<script>
import { onMounted } from 'vue'
export default {
	props: {
		theme: String
	},
	setup(props) {
		onMounted(() => {
			if (props.theme == 'dark') {
				document.documentElement.setAttribute('data-theme', 'dark')
			} else {
				document.documentElement.removeAttribute('data-theme')
			}
		})
	}
}
</script>
