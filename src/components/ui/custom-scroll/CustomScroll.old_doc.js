import CustomScroll from './CustomScroll.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/CustomScroll',
	component: CustomScroll,
	argTypes: {},
	args: {
		title: 'My Title',
		show: true
	}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { CustomScroll },
	setup() {
		return { args }
	},
	template: `
    <CustomScroll>
      <img
				src="https://www2.mercedes-benz.com.br/passengercars/mercedes-benz-cars/models/amg-gt/4-door-coupe/explore/models/_jcr_content/par/productinfotextimage/media2/slides/videoimageslide_3f5/image.MQ6.7.2x.20210819172023.jpeg"
			/>
    </CustomScroll>
  `
})

export const Default = Template.bind({})
Default.args = {
	width: 200,
	height: 200
}
