import Link from './Link.vue'
import vueRouter from 'storybook-vue3-router'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Ui/Link',
  component: Link,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { Link },
  setup() {
    return { args }
  },
  template: `
    <Link v-bind="args">
      meu link ui-router
    </Link>
  `,
})

export const To = Template.bind({})
To.args = {
  label: 'Link',
  to: { name: 'home' }
}
To.decorators = [
  vueRouter()
]

export const Href = Template.bind({})
Href.args = {
  label: 'Link',
  href: '/home'
}
