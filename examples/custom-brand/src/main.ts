import { DS } from 'design-system'
import { createApp } from 'vue'

import App from './App.vue'


const app = createApp(App)

app.use(DS, { detectColorScheme: false })

app.mount('#app')
