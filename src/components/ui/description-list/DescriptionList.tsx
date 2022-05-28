import { defineComponent } from 'vue'
import './DescriptionList.scss'

export { default as Item } from './components/description-list-item/DescriptionListItem.vue'

export default defineComponent({
	render({ $slots }: any) {
		return <div class="ui-description-list">{$slots.default()}</div>
	}
})
