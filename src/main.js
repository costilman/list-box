import { createApp } from 'vue'
import App from './App.vue'

import bem from './plugins/bem'

const app = createApp(App)

app.use(bem)
app.mount('#app')
