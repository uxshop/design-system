import PageHelper from './PageHelper.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Components/PageHelper',
	component: PageHelper,
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { PageHelper },
	setup() {
		return { args }
	},
	template: `
    <PageHelper v-bind="args">
      Saiba mais sobre
			<a :href="this.$route.meta.support" style="text-transform: lowercase">
				produtos
			</a>
			na base de conhecimento.
    </PageHelper>
  `
})

export const Default = Template.bind({})
Default.args = {
	title: 'Produtos'
}

Default.decorators = [vueRouter()]
