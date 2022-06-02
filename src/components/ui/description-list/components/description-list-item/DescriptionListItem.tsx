import { defineComponent } from 'vue'

export default defineComponent({
	props: ['label'],
	render(props: any) {
		const description = props.$slots.default ? props.$slots.default() : props.label
		return (
			<div className="ui-description-list-item">
				<div className="ui-description-list-item-label">{props.label}</div>
				<div className="ui-description-list-item-description">{description}</div>
			</div>
		)
	}
})
