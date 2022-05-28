import '../src/scss/theme.scss'
import { app, addDecorator } from '@storybook/vue3'
import { jsxDecorator } from 'storybook-addon-jsx'
import Darkmode from '../src/components/Darkmode.vue'
addDecorator(jsxDecorator)
app.component('Darkmode', Darkmode)

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' }
	// layout: 'fullscreen',
}

export const globalTypes = {
	theme: {
		name: 'Theme',
		defaultValue: 'light',
		toolbar: {
			icon: 'circlehollow',
			items: ['light', 'dark'],
			showName: false
		}
	}
}

export const decorators = [
	(story, context) => ({
		components: { story },
		template: `
    <Darkmode theme="${context.globals.theme}"  />
    <story />
  `
	})
]
