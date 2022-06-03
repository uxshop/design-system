import { defineComponent } from 'vue'
import './TagList.scss'

export default defineComponent({
	render({ $slots }: any) {
		return <div class="ui-tag-list">{$slots.default()}</div>
	}
})
