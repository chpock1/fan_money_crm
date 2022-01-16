import { createApp } from 'vue'
import App from './components/FanIndex.vue'
import router from './components/config/routes'
import store from './components/config/store'

createApp(App).use(store).use(router).mount('#app')
