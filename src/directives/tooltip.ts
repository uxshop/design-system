import type { DirectiveBinding } from 'vue'

const tooltip = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		init(el, binding)
	},
	updated(el: HTMLElement, binding: DirectiveBinding) {
		init(el, binding)
	}
}

function init(el: HTMLElement, binding: DirectiveBinding) {
	const position = binding.arg || 'top'
	const tooltipText = binding.value || 'Tooltip text'
	el.setAttribute('position', position)
	el.setAttribute('tooltip', tooltipText)
}

export default tooltip
