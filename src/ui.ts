import tooltip from './directives/tooltip'

export default {
	install: (app: any) => {
		const prefix = 'Ui'
		app.directive('Tooltip', tooltip)
	}
}
