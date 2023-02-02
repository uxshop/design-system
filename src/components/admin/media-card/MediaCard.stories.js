import MediaCard from './MediaCard.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/MediaCard',
	component: MediaCard,
	args: {
		title: 'Lorem Ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		image: 'https://picsum.photos/544/208',
		imageHref: 'https://google.com',
		buttons: [{ label: 'button', to: 'https://google.com', target: '_blank' }]
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
