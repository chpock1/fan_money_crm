import Vue, { createApp } from 'vue'
import App from './components/FanIndex.vue'
import router from './components/config/routes'
import store from './components/config/store'

import { ObserveVisibility } from 'vue-observe-visibility'


createApp(App).directive('observe-visibility', ObserveVisibility).use(store).use(router).mount('#app')
