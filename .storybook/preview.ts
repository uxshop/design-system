import { setup, Preview } from '@storybook/vue3'
import { scheme, SchemeMode } from './decorators/scheme-mode'
import { brand, BrandMode } from './decorators/brand-mode';
import './theme.scss'
import '../src/scss/theme.scss'

setup((app) => {
});


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    SchemeMode,
    BrandMode
  ],
  globalTypes: {
    scheme,
    brand
  },
}

export default preview
