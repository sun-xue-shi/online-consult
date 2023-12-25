import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import 'vant/es/toast/style/index'
import 'vant/es/dialog/style/index'
import 'vant/es/image-preview/style/index'
import '@/styles/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
