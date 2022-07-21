import MediaCard from './MediaCard.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/MediaCard',
	component: MediaCard,
	args: {
		title: 'title',
		text: 'text',
		label: 'button'
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { MediaCard },
	setup() {
		return { args }
	},
	template: `
    <MediaCard v-bind="args"/>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const Video = Template.bind({})
Video.args = {
	inverse: true,
	video: '4CaEGG0xpMk'
}

Default.decorators = [vueRouter()]
