import Card from './Card.vue'
import CardTitle from './CardTitle.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
	title: 'Ui/Card',
	component: Card,
	// More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
	argTypes: {}
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
	components: { Card },
	setup() {
		return { args }
	},
	template: `
  <Card v-bind="args">
    Conteudo do card
  </Card>
  `
})

export const Default = Template.bind({})
Default.args = {
	title: 'Card normal'
}

export const Dropdown = Template.bind({})
Dropdown.args = {
	title: 'Card dropdown',
	dropdownClosed: true,
	dropdown: true
}

const Template2 = (args) => ({
	components: { Card, CardTitle },
	setup() {
		return { args }
	},
	template: `
    <Card v-bind="args">
      <template #header-title>
        <CardTitle>#headerTitle</CardTitle>
      </template>
      <template #caption>
        #caption
      </template>
      <template #header-button>
        #header-button
      </template>
      <template #footer>
        #footer
      </template>
      #default
    </Card>
  `
})

export const Slots = Template2.bind({})
Slots.args = {
	title: 'Card dropdown'
}
