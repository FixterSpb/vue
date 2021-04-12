import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

createApp(App).use(store).use(router).mount('#app')
