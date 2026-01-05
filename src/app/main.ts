import './app.css'
import { createApp } from 'vue'
import { createPinia } from "pinia"
import { router } from "./providers/router.ts"
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
