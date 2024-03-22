import { DS } from 'design-system/src/setup'
import { createApp } from 'vue'

import App from './App.vue'


const app = createApp(App)

app.use(DS, { detectColorScheme: false })

app.mount('#app')
