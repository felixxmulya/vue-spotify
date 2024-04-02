import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vClickOutside from 'v-click-outside'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vClickOutside)

app.mount('#app')
