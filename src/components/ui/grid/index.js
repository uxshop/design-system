import UiContainer from './container/Container.vue'
import UiRow from './row/Row.vue'
import UiCol from './col/Col.vue'

export default {
  install(app) {
    app.component('UiContainer', UiContainer)
    app.component('UiRow', UiRow)
    app.component('UiCol', UiCol)
  }
}
