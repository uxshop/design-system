import type { Preview } from '@storybook/vue3'
import '../src/scss/theme.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    designToken: {
      disable: true
    }
  }
}

export default preview
