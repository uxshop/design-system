import Image from './Image.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Image',
	component: Image,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Image },
	setup() {
		return { args }
	},
	template: `
    <Image v-bind="args" />
  `
})

export const Default = Template.bind({})
Default.args = {
	src: `https://picsum.photos/id/11/500/300`
}

export const noImage = Template.bind({})
noImage.args = {
	src: null,
	size: 200
}

export const imageBg = Template.bind({})
imageBg.args = {
	src: `https://picsum.photos/id/14/500/300`,
	isBg: true,
	rounded: true,
	size: 100
}
