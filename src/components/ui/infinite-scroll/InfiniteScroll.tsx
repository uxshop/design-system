import { getCurrentInstance, onMounted, ref, defineComponent, nextTick } from 'vue'
import Spinner from '../spinner/Spinner.vue'
import TextStyle from '../text-style/TextStyle.vue'
import './InfiniteScroll.scss'

export interface IContext {
	loaded(): void
	noMore(): void
}

export default defineComponent({
	props: ['load', 'spinnerSize'],
	setup({ load, spinnerSize }, { expose }) {
		const uid = `ui-infinite-loading-${getCurrentInstance()?.uid}`
		const parentEl = ref<HTMLElement>()
		const listen = ref(true)
		const noMore = ref()
		const context = {
			noMore: () => {
				noMore.value = true
				removeListener()
			},
			loaded: () => {
				listen.value = true
			}
		}

		const handleScroll = () => {
			if (parentEl.value) {
				const rect = parentEl.value.getBoundingClientRect()
				const heightScroll = parentEl.value.scrollTop + rect.height
				if (parentEl.value?.scrollHeight == heightScroll && listen.value) {
					listen.value = false
					load(context)
				}
			}
		}

		const removeListener = () => {
			if (parentEl.value) {
				parentEl.value.removeEventListener('scroll', handleScroll, false)
				listen.value = false
			}
		}

		const addListener = () => {
			if (parentEl.value) {
				parentEl.value.scrollTo({ top: 0 })
				noMore.value = false
				parentEl.value.addEventListener('scroll', handleScroll, false)
				listen.value = true
				load(context)
			}
		}

		onMounted(() => {
			const el = document.getElementById(uid)

			if (el) {
				parentEl.value = el.parentElement as HTMLElement
				addListener()
			}
		})

		expose({
			reset() {
				nextTick(() => addListener())
			}
		})

		return () => (
			<div className="ui-infinite-loading" id={uid}>
				<div className="ui-infinite-loading-content">
					{noMore.value && (
						<div className="ui-infinite-loading-no-more">
							<TextStyle variant="muted">Sem mais resultados</TextStyle>
						</div>
					)}
					{listen.value && (
						<div className="ui-infinite-loading-spinner">
							<Spinner border="2" size={spinnerSize || 25} variant="dark" />
						</div>
					)}
				</div>
			</div>
		)
	}
})
