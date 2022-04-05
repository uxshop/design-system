import '../src/scss/theme.scss'
import { app } from '@storybook/vue3'
import ui from '../src/ui'

app.use(ui)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: 'fullscreen',
}
